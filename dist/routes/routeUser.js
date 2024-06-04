"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

const route = _express.Router.call(void 0, );


var _UserControllerjs = require('../controllers/UserController.js'); var _UserControllerjs2 = _interopRequireDefault(_UserControllerjs);

route.get('/', _UserControllerjs2.default.index);
route.post('/', _UserControllerjs2.default.store);
route.put('/:id', _UserControllerjs2.default.update);
route.delete('/:id', _UserControllerjs2.default.delete);

exports. default = route;