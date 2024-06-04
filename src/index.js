//import cors from 'cors';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';


import dotenv from 'dotenv';

import alunoRoute from './routes/routeAluno.js';
import homeRoute from './routes/routeHome.js';
import tokenRoute from './routes/routeToken.js';
import userRoute from './routes/routeUser.js';

dotenv.config();

const app = express();


mongoose.connect(process.env.DB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true

}, console.log('OK'))

const corsOptions = {
  origin: 'http://localhost:3000',
  credential: true,
  optionSucessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extends: true }))

app.use('/', homeRoute);
app.use('/users/', userRoute);
app.use('/alunos/', alunoRoute);
app.use('/tokens/', tokenRoute);






app.listen(3000, () => {
  console.log('Acessar http://localhost:3000');
  console.log('Conectado com sucesso');
});
