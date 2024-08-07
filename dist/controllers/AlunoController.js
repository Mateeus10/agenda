"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _AlunoModeljs = require('../models/AlunoModel.js'); var _AlunoModeljs2 = _interopRequireDefault(_AlunoModeljs);

class AlunoController {
  async store(req, res) {
    const { nome, sobrenome, email, password } = req.body;


    if (!nome || !sobrenome || !email || !password) {
      return res.status(400).json({ message: 'Por favor, forneça todos os campos obrigatórios: nome, sobrenome, email e idade.' });
    }

    try {
      const existingAluno = await _AlunoModeljs2.default.findOne({ email });

      if (existingAluno) {
        return res.status(400).json({ message: 'E-mail já registrado. Por favor, escolha outro.' });
      }

      const newAluno = new (0, _AlunoModeljs2.default)({ nome, sobrenome, email, password });
      await newAluno.save();

      return res.status(200).json(newAluno);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async index(req, res) {
    try {
      const users = await _AlunoModeljs2.default.find({});
      return res.json(users);

    } catch (error) {

    }

  }

  async update(req, res) {
    const { id } = req.params; // Supondo que você está passando o ID do usuário como parte da URL
    const { nome, sobrenome, email } = req.body;

    try {
      const updatedAluno = await _AlunoModeljs2.default.findOneAndUpdate(
        { _id: id }, // Critério de busca: encontrar o usuário pelo ID
        { nome, sobrenome, email }, // Novos valores a serem atualizados
        { new: true } // Opção para retornar o novo documento atualizado
      );

      if (!updatedAluno) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
      }

      return res.json(updatedAluno);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao atualizar usuário.' });
    }
  }
  async delete(req, res) {
    const { id } = req.params;

    try {
      const deletedAluno = await _AlunoModeljs2.default.findOneAndDelete({ _id: id });

      if (!deletedAluno) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
      }

      return res.json({ message: 'Usuário excluído com sucesso.' });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao excluir usuário.' });
    }
  }
  async show(req, res) {
    try {
      const aluno = await _AlunoModeljs2.default.findById(req.params.id);

      const { id, nome, email } = aluno;

      return res.json({ id, nome, email });
    } catch (error) {
      return res.json(null);

    }
  }


}

exports. default = new AlunoController();
