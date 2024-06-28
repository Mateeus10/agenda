"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _UserModeljs = require('../models/UserModel.js'); var _UserModeljs2 = _interopRequireDefault(_UserModeljs);

_dotenv2.default.config(); // Carregar variáveis de ambiente do arquivo .env

class TokenController {
  async store(req, res) {
    const { email = '', password = '' } = req.body;



    if (!email || !password) {
      return res.status(401).json({
        errors: ['Credenciais inválidas'],
      });
    }


    const user = await _UserModeljs2.default.findOne({ email });

    if (!user) {

      return res.status(401).json({ errors: ['Usuário não existe'] });
    }


    if (!(await user.passwordIsValid(password))) {

      return res.status(401).json({ errors: ['Senha inválida'] });
    }

    const token = _jsonwebtoken2.default.sign({ id: user._id, email: user.email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });


    return res.json({ token, user: { nome: user.nome, id: user._id, email: user.email } });

  }
}

exports. default = new TokenController();