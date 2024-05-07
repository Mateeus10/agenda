"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

const route = _express.Router.call(void 0, );

var _AlunoController = require('../controllers/AlunoController'); var _AlunoController2 = _interopRequireDefault(_AlunoController);

route.get('/', _AlunoController2.default.index);
route.post('/', _AlunoController2.default.store);
route.put('/:id', _AlunoController2.default.update);
route.delete('/:id', _AlunoController2.default.delete);

exports. default = route;