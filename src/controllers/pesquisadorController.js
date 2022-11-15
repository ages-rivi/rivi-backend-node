const service = require('../services/pesquisadorService');

module.exports = {
  // GET - retorna todos pesquisadores
  getAllPesquisadores: async (req, res) => {
    try {
      const pesquisadores = await service.getAllPesquisadores(req, res);
      return res.status(200).json(pesquisadores);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  // GET - retorna um único pesquisador
  getPesquisador: async (req, res) => {
    try {
      const pesquisador = await service.getPesquisador(req, res);
      return res.status(200).json(pesquisador);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  // POST - cria um pesquisador
  createPesquisador: async (req, res) => {
    try {
      const pesquisador = await service.createPesquisador(req, res);
      return res.status(200).json(pesquisador);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  // UPDATE - atualiza um pesquisador
  updatePesquisador: async (req, res) => {
    try {
      const pesquisador = await service.updatePesquisador(req, res);
      return res.status(200).json(pesquisador);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  // DELETE - deleta um pesquisador
  deletePesquisador: async (req, res) => {
    try {
      const pesquisador = await service.deletePesquisador(req, res);
      return res.status(200).json({ message: pesquisador });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
};
