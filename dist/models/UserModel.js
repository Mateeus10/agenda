"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);
var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);
var _validator = require('validator'); var _validator2 = _interopRequireDefault(_validator);

const UserSchema = new _mongoose2.default.Schema({
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

// Método para validar a senha
UserSchema.methods.passwordIsValid = async function (password) {
  try {
    return await _bcryptjs2.default.compare(password, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

// Middleware para hash da senha antes de salvar
UserSchema.pre('save', async function (next) {
  try {
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

exports. default = User;
