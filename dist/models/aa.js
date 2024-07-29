"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);
var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);
var _validator = require('validator'); var _validator2 = _interopRequireDefault(_validator);


const CounterUsSchema = new _mongoose2.default.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 }
});

const CounterUs = _mongoose2.default.model('CounterUs', CounterUsSchema);


const createUserCounterIfNeeded = async function () {
  try {
    const existingCounter = await CounterUs.findOne({ _id: 'UserId' });
    if (!existingCounter) {
      await CounterUs.create({ _id: 'UserId' });
    }
  } catch (error) {
    console.error('Erro ao criar o contador de usuarios:', error);
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
UserSchema.methods.passwordIsValid = async function (password) {
  try {
    return await _bcryptjs2.default.compare(password, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

UserSchema.pre('save', async function (next) {
  try {
    if (this.isNew) {
      const contador = await CounterAl.findOneAndUpdate({ _id: 'UserId' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true });
      this._id = contador.seq;
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



createUserCounterIfNeeded();
