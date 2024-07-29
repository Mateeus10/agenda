import Aluno from '../models/AlunoModel.js';

class AlunoController {
  async store(req, res) {
    const { nome, sobrenome, email, password } = req.body;


    if (!nome || !sobrenome || !email || !password) {
      return res.status(400).json({ message: 'Por favor, forneça todos os campos obrigatórios: nome, sobrenome, email e idade.' });
    }

    try {
      const existingAluno = await Aluno.findOne({ email });

      if (existingAluno) {
        return res.status(400).json({ message: 'E-mail já registrado. Por favor, escolha outro.' });
      }

      const newAluno = new Aluno({ nome, sobrenome, email, password });
      await newAluno.save();

      return res.status(200).json(newAluno);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async index(req, res) {
    try {
      const users = await Aluno.find({});
      return res.json(users);

    } catch (error) {

    }

  }

  async update(req, res) {
    const { id } = req.params; // Supondo que você está passando o ID do usuário como parte da URL
    const { nome, sobrenome, email } = req.body;

    try {
      const updatedAluno = await Aluno.findOneAndUpdate(
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
      const deletedAluno = await Aluno.findOneAndDelete({ _id: id });

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
      const aluno = await Aluno.findById(req.params.id);

      const { id, nome, email } = aluno;

      return res.json({ id, nome, email });
    } catch (error) {
      return res.json(null);

    }
  }


}

export default new AlunoController();
