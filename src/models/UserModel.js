import bcryptjs from 'bcryptjs';
import mongoose from 'mongoose';
import validator from 'validator';

const CounterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 }
});

const Counter = mongoose.model('Counter', CounterSchema);

const createCounterIfNeeded = async function () {
  try {
    const existingCounter = await Counter.findOne({ _id: 'userId' });
    if (!existingCounter) {
      await Counter.create({ _id: 'userId' });
      console.log('Contador criado com sucesso.');
    }
  } catch (error) {
    console.error('Erro ao criar o contador:', error);
  }
}

const UserSchema = new mongoose.Schema({
  _id: {
    type: Number,
    default: 0
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

UserSchema.pre('save', async function (next) {
  try {
    if (this.isNew) {
      // Incrementar o contador de ID
      const counter = await Counter.findOneAndUpdate(
        { _id: 'userId' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this._id = counter.seq;
    }

    // Gerar hash da senha
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

// Inicializar o contador quando o módulo é carregado
createCounterIfNeeded();

export default User;