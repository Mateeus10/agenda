import bcryptjs from 'bcryptjs';
import mongoose from 'mongoose';
import validator from 'validator';

const UserSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: props => `${props.value} não é um e-mail válido!`
    }
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Método para validar a senha
UserSchema.methods.passwordIsValid = async function (password) {
  try {
    return await bcryptjs.compare(password, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

// Middleware para hash da senha antes de salvar
UserSchema.pre('save', async function (next) {
  try {
    if (this.isModified('password')) {
      const salt = await bcryptjs.genSalt(10);
      this.password = await bcryptjs.hash(this.password, salt);
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Criar o modelo de Usuário
const User = mongoose.model('User', UserSchema);

export default User;
