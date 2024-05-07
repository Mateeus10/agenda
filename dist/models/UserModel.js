"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);
var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);
var _validator = require('validator'); var _validator2 = _interopRequireDefault(_validator);

const CounterSchema = new _mongoose2.default.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 }
});

const Counter = _mongoose2.default.model('Counter', CounterSchema);

// Função para criar o contador apenas se ele ainda não existir
const createCounterIfNeeded = async function () {
  try {
    const existingCounter = await Counter.findOne({ _id: 'userId' });
    if (!existingCounter) {
      await Counter.create({ _id: 'userId' });
    }
  } catch (error) {
    console.error('Erro ao criar o contador:', error);
  }
}

const UserSchema = new _mongoose2.default.Schema({
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
      validator: _validator2.default.isEmail,
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
      const counter = await Counter.findOneAndUpdate({ _id: 'userId' }, { $inc: { seq: 1 } }, { new: true, upsert: true });
      this._id = counter.seq;
    }
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.pre('save', async function () {
  const salt = await _bcryptjs2.default.genSalt(10);
  this.password = await _bcryptjs2.default.hash(this.password, salt);
});

const User = _mongoose2.default.model('User', UserSchema);
exports. default = User;

// Verifica se o contador existe e, se não existir, cria um novo
createCounterIfNeeded();
