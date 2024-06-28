import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';


import alunoRoute from './routes/routeAluno.js';
import homeRoute from './routes/routeHome.js';
import tokenRoute from './routes/routeToken.js';
import userRoute from './routes/routeUser.js';




const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
};

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes()

  }
  middlewares() {
    this.app.use(cors(corsOptions));
    this.app.use(helmet())
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));

  }

  routes() {
    this.app.use('/', homeRoute);
    this.app.use('/users/', userRoute);
    this.app.use('/alunos/', alunoRoute);
    this.app.use('/tokens/', tokenRoute);

    this.app.options('*', cors(corsOptions));


  }
}


export default new App().app;