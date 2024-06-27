"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _helmet = require('helmet'); var _helmet2 = _interopRequireDefault(_helmet);
var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);


var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);

var _routeAlunojs = require('./routes/routeAluno.js'); var _routeAlunojs2 = _interopRequireDefault(_routeAlunojs);
var _routeHomejs = require('./routes/routeHome.js'); var _routeHomejs2 = _interopRequireDefault(_routeHomejs);
var _routeTokenjs = require('./routes/routeToken.js'); var _routeTokenjs2 = _interopRequireDefault(_routeTokenjs);
var _routeUserjs = require('./routes/routeUser.js'); var _routeUserjs2 = _interopRequireDefault(_routeUserjs);

_dotenv2.default.config()

_mongoose2.default.connect(process.env.DB_URL, {
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

const app = _express2.default.call(void 0, );

app.use(_cors2.default.call(void 0, corsOptions));
app.use(_helmet2.default.call(void 0, ))
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
