
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';


import dotenv from 'dotenv';

import alunoRoute from './routes/routeAluno.js';
import homeRoute from './routes/routeHome.js';
import tokenRoute from './routes/routeToken.js';
import userRoute from './routes/routeUser.js';

dotenv.config()

mongoose.connect(process.env.DB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true

}, console.log('OK'))

const whiteList = [
  'https://agenda-rafo.onrender.com'
]

const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by Cors'));
    }
  }
}

const app = express();

app.use(cors(corsOptions));
app.use(helmet())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', homeRoute);
app.use('/users/', userRoute);
app.use('/alunos/', alunoRoute);
app.use('/tokens/', tokenRoute);


app.listen(3005, () => {
  console.log('Acessar http://localhost:3005');
  console.log('Conectado com sucesso');
});
