import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';

dotenv.config(); // Carregar variáveis de ambiente do arquivo .env

class TokenController {
  async store(req, res) {
    try {
      // Obter email e senha do corpo da requisição
      const { email = '', password = '' } = req.body;



      // Verificar se o email e a senha foram fornecidos
      if (!email || !password) {
        return res.status(401).json({ errors: ['Digite sua senha e seu email'] });
      }

      // Encontrar o usuário com base no email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ errors: ['Usuario não existe'] });
      }

      // Verificar se a senha está correta
      const passwordIsValid = await bcrypt.compare(password, user.password);
      if (!passwordIsValid) {
        return res.status(401).json({ errors: ['Senha Invalida'] });
      }


      const { _id } = user;
      const token = jwt.sign({ _id, email }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION
      });


      // Retornar o token como resposta
      return res.json({ token });
    } catch (error) {
      return res.status(500).json({ errors: ['Erro interno do servidor'] });
    }
  }
}

export default new TokenController();
