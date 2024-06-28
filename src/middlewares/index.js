import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.json({
      error: ['Login Required'],
    });
  }

  const [, token] = authorization.split(' ');

  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = dados;

    const user = await User.findOne({
      id,
      email,
    });

    if (!user) {
      return res.status(401).json({
        errors: ['Usuário Inválido'],
      });
    }

    req.userId = id;
    req.userEmail = email;

    return next();

  } catch (error) {
    return res.status(401).json({
      errors: ['Token expirado ou invalido']
    });

  }
}