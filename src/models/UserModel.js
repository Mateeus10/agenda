import mongoose from 'mongoose';
import validator from 'validator';

const UserSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  sobrenome: {
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
  idade: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: 'tem que ser um número',
    },
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre('save', async function (next) {
  try {
    const existingUser = await this.constructor.findOne({ email: this.email });
    if (existingUser) {
      throw new Error('E-mail já existe');
    }
    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.model('User', UserSchema);
