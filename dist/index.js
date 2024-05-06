"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }//import cors from 'cors';
var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);


var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);

var _routeUserjs = require('./routes/routeUser.js'); var _routeUserjs2 = _interopRequireDefault(_routeUserjs);

_dotenv2.default.config();

const app = _express2.default.call(void 0, );


_mongoose2.default.connect(process.env.DB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true

}, console.log('OK'))


app.use(_express2.default.json());

app.use('/users/', _routeUserjs2.default);






app.listen(3008, () => {
  console.log('Acessar http://localhost:3008');
  console.log('Conectado com sucesso');
});
