import cors from 'cors';
import express from 'express';
import helmet from 'helmet';


import alunoRoute from './routes/routeAluno.js';
import homeRoute from './routes/routeHome.js';
import tokenRoute from './routes/routeToken.js';
import userRoute from './routes/routeUser.js';



// const whiteList = [
//   'http://localhost:3005',
//   'https://agenda-1.onrender.com'
// ];

const corsOptions = {
  origin: ['http://localhost:3000', 'https://agenda-rafo.onrender.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],// Métodos permitidos (opcional)
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true

};


class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes()

  }
  middlewares() {
    this.app.use(cors(corsOptions))
    this.app.use(helmet())
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

  }

  routes() {
    this.app.use('/', homeRoute);
    this.app.use('/users/', userRoute);
    this.app.use('/alunos/', alunoRoute);
    this.app.use('/tokens/', tokenRoute);
  }
}


export default new App().app;