"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _helmet = require('helmet'); var _helmet2 = _interopRequireDefault(_helmet);


var _routeAlunojs = require('./routes/routeAluno.js'); var _routeAlunojs2 = _interopRequireDefault(_routeAlunojs);
var _routeHomejs = require('./routes/routeHome.js'); var _routeHomejs2 = _interopRequireDefault(_routeHomejs);
var _routeTokenjs = require('./routes/routeToken.js'); var _routeTokenjs2 = _interopRequireDefault(_routeTokenjs);
var _routeUserjs = require('./routes/routeUser.js'); var _routeUserjs2 = _interopRequireDefault(_routeUserjs);


const whiteList = [
  'http://localhost:3005'

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

class App {
  constructor() {
    this.app = _express2.default.call(void 0, );
    this.middlewares();
    this.routes()

  }
  middlewares() {
    this.app.use(_cors2.default.call(void 0, corsOptions));
    this.app.use(_helmet2.default.call(void 0, ))
    this.app.use(_express2.default.json());
    this.app.use(_express2.default.urlencoded({ extended: true }));

  }

  routes() {
    this.app.use('/', _routeHomejs2.default);
    this.app.use('/users/', _routeUserjs2.default);
    this.app.use('/alunos/', _routeAlunojs2.default);
    this.app.use('/tokens/', _routeTokenjs2.default);


  }
}


exports. default = new App().app;