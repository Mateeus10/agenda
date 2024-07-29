import bcryptjs from 'bcryptjs';
import mongoose from 'mongoose';
import validator from 'validator';


const CounterUsSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 }
});

const CounterUs = mongoose.model('CounterUs', CounterUsSchema);


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
UserSchema.methods.passwordIsValid = async function (password) {
  try {
    return await bcryptjs.compare(password, this.password);
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
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
});

const User = mongoose.model('User', UserSchema);

export default User;



createUserCounterIfNeeded();
