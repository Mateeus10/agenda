"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);
var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _UserModeljs = require('../models/UserModel.js'); var _UserModeljs2 = _interopRequireDefault(_UserModeljs);

_dotenv2.default.config();

class TokenController {
  async store(req, res) {
    try {

      const { email = '', password = '' } = req.body;




      if (!email || !password) {
        return res.status(401).json({ errors: ['Digite sua senha e seu email'] });
      }

      // Encontrar o usuário com base no email
      const user = await _UserModeljs2.default.findOne({ email });
      if (!user) {
        return res.status(401).json({ errors: ['Usuario não existe'] });
      }

      // Verificar se a senha está correta
      const passwordIsValid = await _bcryptjs2.default.compare(password, user.password);
      if (!passwordIsValid) {
        return res.status(401).json({ errors: ['Senha Invalida'] });
      }


      const { id } = user;
      const token = _jsonwebtoken2.default.sign({ id, email }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION
      });


      // Retornar o token como resposta
      return res.json({ token });
    } catch (error) {
      return res.status(500).json({ errors: ['Erro interno do servidor'] });
    }
  }
}

exports. default = new TokenController();
