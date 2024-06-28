import User from '../models/UserModel.js';

class UserController {
  async store(req, res) {
    const { nome, email, password } = req.body;


    if (!nome || !email || !password) {
      return res.status(400).json({ message: 'Por favor, forneça todos os campos obrigatórios: nome, sobrenome, email e idade.' });
    }

    try {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ message: 'E-mail já registrado. Por favor, escolha outro.' });
      }

      const newUser = new User({ nome, email, password });
      await newUser.save();

      return res.status(200).json(newUser);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async index(req, res) {
    try {
      const users = await User.find({});
      return res.json(users);

    } catch (error) {

    }

  }

  async update(req, res) {
    const { id } = req.params; // Supondo que você está passando o ID do usuário como parte da URL
    const { nome, sobrenome, email, idade } = req.body;

    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: id }, // Critério de busca: encontrar o usuário pelo ID
        { nome, sobrenome, email, idade }, // Novos valores a serem atualizados
        { new: true } // Opção para retornar o novo documento atualizado
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
      const deletedUser = await User.findOneAndDelete({ _id: id });

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
      const user = await User.findById(req.params.id);

      const { _id, nome, email } = user;

      return res.json({ _id, nome, email });
    } catch (error) {
      return res.json(null);

    }
  }

}

export default new UserController();
