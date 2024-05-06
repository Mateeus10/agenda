//import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';


import dotenv from 'dotenv';

import userRoute from './routes/routeUser.js';

dotenv.config();

const app = express();


mongoose.connect(process.env.DB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true

}, console.log('OK'))


app.use(express.json());

app.use('/users/', userRoute);






app.listen(3008, () => {
  console.log('Acessar http://localhost:3008');
  console.log('Conectado com sucesso');
});
