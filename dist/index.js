"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);
var _app = require('./app'); var _app2 = _interopRequireDefault(_app);


var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);


_dotenv2.default.config()

_mongoose2.default.connect(process.env.DB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true

}, console.log('OK'))

const port = process.env.APP_PORT;

_app2.default.listen(port);

