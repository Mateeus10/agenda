import bcryptjs from 'bcryptjs';
import mongoose from 'mongoose';
import validator from 'validator';

// Definição do modelo CounterAl
const CounterAlSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 }
});

const CounterAl = mongoose.model('CounterAl', CounterAlSchema);

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

const AlunoSchema = new mongoose.Schema({
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
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
});

const Aluno = mongoose.model('Aluno', AlunoSchema);
export default Aluno;

// Verifica se o contador de alunos existe e, se não existir, cria um novo
createAlunoCounterIfNeeded();
