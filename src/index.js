import mongoose from 'mongoose';
import app from './app';


import dotenv from 'dotenv';


dotenv.config()

mongoose.connect(process.env.DB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true

}, console.log('OK'))


app.listen(3005, () => {
  console.log('Acessar http://localhost:3005');
  console.log('Conectado com sucesso');
});

