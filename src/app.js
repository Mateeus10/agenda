import cors from 'cors';
import express from 'express';
import helmet from 'helmet';


import alunoRoute from './routes/routeAluno.js';
import homeRoute from './routes/routeHome.js';
import tokenRoute from './routes/routeToken.js';
import userRoute from './routes/routeUser.js';


const whiteList = [
  'http://localhost:3005'

];

const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by Cors'));
    }
  }
}

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes()

  }
  middlewares() {
    this.app.use(cors(corsOptions));
    this.app.use(helmet())
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

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