var service = require('../services/projetoService');

// GET - retorna todos projetos
const getAllProjetos = async (req, res) => {
  try {
    const projetos = await service.getAllProjetos(req, res);
    return res.status(200).json(projetos);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// GET - retorna um único projeto
const getProjeto = async (req, res) => {
  try {
    const projeto = await service.getProjeto(req, res);
    return res.status(200).json(projeto);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// POST - cria um projeto
const createProjeto = async (req, res) => {
  try {
    const projeto = await service.createProjeto(req, res);
    return res.status(201).json(projeto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// UPDATE - atualiza um projeto
const updateProjeto = async (req, res) => {
  try {
    const projeto = await service.updateProjeto(req, res);
    return res.status(200).json(projeto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE - deleta um projeto
const deleteProjeto = async (req, res) => {
  try {
    await service.deleteProjeto(req, res);
    return res.status(200).json({ mssg: 'Projeto deletado!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllProjetos,
  getProjeto,
  createProjeto,
  updateProjeto,
  deleteProjeto,
};
