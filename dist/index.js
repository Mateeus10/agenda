"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }//import cors from 'cors';
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);


var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);

var _routeAlunojs = require('./routes/routeAluno.js'); var _routeAlunojs2 = _interopRequireDefault(_routeAlunojs);
var _routeHomejs = require('./routes/routeHome.js'); var _routeHomejs2 = _interopRequireDefault(_routeHomejs);
var _routeTokenjs = require('./routes/routeToken.js'); var _routeTokenjs2 = _interopRequireDefault(_routeTokenjs);
var _routeUserjs = require('./routes/routeUser.js'); var _routeUserjs2 = _interopRequireDefault(_routeUserjs);

_dotenv2.default.config();

const app = _express2.default.call(void 0, );


_mongoose2.default.connect(process.env.DB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true

}, console.log('OK'))

const corsOptions = {
  origin: 'http://localhost:3005',
  credential: true,
  optionSucessStatus: 200
}

app.use(_cors2.default.call(void 0, corsOptions));
app.use(_express2.default.json());
app.use(_express2.default.urlencoded({ extended: true }));

app.use('/', _routeHomejs2.default);
app.use('/users/', _routeUserjs2.default);
app.use('/alunos/', _routeAlunojs2.default);
app.use('/tokens/', _routeTokenjs2.default);


app.listen(3005, () => {
  console.log('Acessar http://localhost:3005');
  console.log('Conectado com sucesso');
});
