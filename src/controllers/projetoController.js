var service = require('../services/projetoService');

module.exports = {
  // GET - retorna todos projetos
  getAllProjetos: async function (req, res) {
    try {
      const projetos = await service.getAllProjetos(req, res);
      return res.status(200).json(projetos);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  // GET - retorna um único projeto
  getProjeto: async function (req, res) {
    try {
      const projeto = await service.getProjeto(req, res);
      return res.status(200).json(projeto);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  // POST - cria um projeto
  createProjeto: async function (req, res) {
    try {
      const projeto = await service.createProjeto(req, res);
      return res.status(201).json(projeto);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // UPDATE - atualiza um projeto
  updateProjeto: async function (req, res) {
    try {
      const projeto = await service.updateProjeto(req, res);
      return res.status(200).json(projeto);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // DELETE - deleta um projetos
  deleteProjeto: async function (req, res) {
    try {
      await service.deleteProjeto(req, res);
      return res.status(200).json({ mssg: 'Projeto deletado!' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

// GET - retorna todos projetos
const getAllProjetos = async (req, res) => {
  try {
    const projetos = await service.getAllProjetos(req, res);
    return res.status(200).json(projetos);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
