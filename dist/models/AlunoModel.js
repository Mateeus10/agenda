"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);
var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);
var _validator = require('validator'); var _validator2 = _interopRequireDefault(_validator);

// Definição do modelo CounterAl
const CounterAlSchema = new _mongoose2.default.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 }
});

const CounterAl = _mongoose2.default.model('CounterAl', CounterAlSchema);

// Função para criar o contador de alunos apenas se ele ainda não existir
const createAlunoCounterIfNeeded = async function () {
  try {
    const existingCounter = await CounterAl.findOne({ _id: 'alunoId' });
    if (!existingCounter) {
      await CounterAl.create({ _id: 'alunoId' });
    }
  } catch (error) {
    console.error('Erro ao criar o contador de alunos:', error);
  }
}

const AlunoSchema = new _mongoose2.default.Schema({
  _id: {
    type: Number,
    default: 0 // Definimos o valor padrão como 0
  },
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

AlunoSchema.pre('save', async function (next) {
  try {
    if (this.isNew) {
      const contador = await CounterAl.findOneAndUpdate({ _id: 'alunoId' }, { $inc: { seq: 1 } }, { new: true, upsert: true });
      this._id = contador.seq;
    }
    next();
  } catch (error) {
    next(error);
  }
});

AlunoSchema.pre('save', async function () {
  const salt = await _bcryptjs2.default.genSalt(10);
  this.password = await _bcryptjs2.default.hash(this.password, salt);
});

const Aluno = _mongoose2.default.model('Aluno', AlunoSchema);
exports. default = Aluno;

// Verifica se o contador de alunos existe e, se não existir, cria um novo
createAlunoCounterIfNeeded();
