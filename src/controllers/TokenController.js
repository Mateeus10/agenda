import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';

dotenv.config(); // Carregar variáveis de ambiente do arquivo .env

class TokenController {
  async store(req, res) {
    const { email = '', password = '' } = req.body;



    if (!email || !password) {
      return res.status(401).json({
        errors: ['Credenciais inválidas'],
      });
    }


    const user = await User.findOne({ email });

    if (!user) {

      return res.status(401).json({ errors: ['Usuário não existe'] });
    }


    if (!(await user.passwordIsValid(password))) {

      return res.status(401).json({ errors: ['Senha inválida'] });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });


    return res.json({ token, user: { nome: user.nome, id: user._id, email: user.email } });

  }
}

export default new TokenController();