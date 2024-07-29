"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _UserModeljs = require('../models/UserModel.js'); var _UserModeljs2 = _interopRequireDefault(_UserModeljs);

class UserController {
  async store(req, res) {
    const { nome, email, password } = req.body;


    if (!nome || !email || !password) {
      return res.status(400).json({ message: 'Por favor, forneça todos os campos obrigatórios: nome, sobrenome, email e idade.' });
    }

    try {
      const existingUser = await _UserModeljs2.default.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ message: 'E-mail já registrado. Por favor, escolha outro.' });
      }

      const newUser = new (0, _UserModeljs2.default)({ nome, email, password });
      await newUser.save();

      return res.status(200).json(newUser);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async index(req, res) {
    try {
      const users = await _UserModeljs2.default.find({});
      return res.json(users);

    } catch (error) {

    }

  }

  async update(req, res) {
    const { id } = req.params;
    const { nome, email } = req.body;

    try {
      const updatedUser = await _UserModeljs2.default.findOneAndUpdate(
        { _id: id },
        { nome, email },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
      }

      return res.json(updatedUser);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao atualizar usuário.' });
    }
  }
  async delete(req, res) {
    const { id } = req.params;

    try {
      const deletedUser = await _UserModeljs2.default.findOneAndDelete({ _id: id });

      if (!deletedUser) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
      }

      return res.json({ message: 'Usuário excluído com sucesso.' });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao excluir usuário.' });
    }
  }
  async show(req, res) {
    try {
      const User = await User.findById(req.params.id);

      const { id, nome, email } = User;

      return res.json({ id, nome, email });
    } catch (error) {
      return res.json(null);

    }
  }


}

exports. default = new UserController();
