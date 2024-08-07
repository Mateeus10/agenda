"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);
var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);
var _validator = require('validator'); var _validator2 = _interopRequireDefault(_validator);

const CounterSchema = new _mongoose2.default.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 }
});

const Counter = _mongoose2.default.model('Counter', CounterSchema);

const createCounterIfNeeded = async function () {
  try {
    const existingCounter = await Counter.findOne({ _id: 'userId' });
    if (!existingCounter) {
      await Counter.create({ _id: 'userId' });
      console.log('Contador criado com sucesso.');
    }
  } catch (error) {

  }
}

const UserSchema = new _mongoose2.default.Schema({
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
      const salt = await _bcryptjs2.default.genSalt(10);
      this.password = await _bcryptjs2.default.hash(this.password, salt);
    }

    next();
  } catch (error) {
    next(error);
  }
});

// Criar o modelo de Usuário
const User = _mongoose2.default.model('User', UserSchema);

// Inicializar o contador quando o módulo é carregado
createCounterIfNeeded();

exports. default = User;