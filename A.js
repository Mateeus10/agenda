import bcryptjs from 'bcryptjs';
import mongoose from 'mongoose';
import validator from 'validator';

const CounterUsSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 }
});

const UserCounter = mongoose.model('UserCounter', CounterUsSchema);

// Função para criar o contador de alunos apenas se ele ainda não existir
const createUser = async function () {
  try {
    const existingCounter = await UserCounter.findOne({ _id: 'UserId' });
    if (!existingCounter) {
      await UserCounter.create({ _id: 'UserId' });
    }
  } catch (error) {
    console.error('Erro ao criar o contador de alunos:', error);
  }
}

const UserSchema = new mongoose.Schema({
  _id: {
    type: Number,
    default: 0 // Definimos o valor padrão como 0
  },
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


UserSchema.pre('save', async function (next) {
  try {
    if (this.isNew) {
      const contador = await UserCounter.findOneAndUpdate({ _id: 'UserId' }, { $inc: { seq: 1 } }, { new: true, upsert: true });
      this._id = contador.seq;
    }
    next();
  } catch (error) {
    next(error);
  }
});



const User = mongoose.model('User', UserSchema);
export default User;

// Verifica se o contador de alunos existe e, se não existir, cria um novo
createUser();
