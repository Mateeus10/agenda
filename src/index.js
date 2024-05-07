//import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';


import dotenv from 'dotenv';

import alunoRoute from './routes/routeAluno.js';
import userRoute from './routes/routeUser.js';

dotenv.config();

const app = express();


mongoose.connect(process.env.DB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true

}, console.log('OK'))


app.use(express.json());

app.use('/users/', userRoute);
app.use('/alunos/', alunoRoute);






app.listen(3008, () => {
  console.log('Acessar http://localhost:3008');
  console.log('Conectado com sucesso');
});
