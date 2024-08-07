"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

const route = _express.Router.call(void 0, );

var _UserControllerjs = require('../controllers/UserController.js'); var _UserControllerjs2 = _interopRequireDefault(_UserControllerjs);
var _indexjs = require('../middlewares/index.js'); var _indexjs2 = _interopRequireDefault(_indexjs);

route.get('/', _UserControllerjs2.default.index);
// route.get('/:id', UserController.show);
route.post('/', _UserControllerjs2.default.store);
route.put('/:id', _UserControllerjs2.default.update);
route.delete('/:id', _indexjs2.default, _UserControllerjs2.default.delete);

exports. default = route;