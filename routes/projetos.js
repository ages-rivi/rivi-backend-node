const express = require('express');
const {
  getAllProjetos,
  getProjeto,
  getPesquisadoresByProject,
  createProjeto,
  updateProjeto,
  deleteProjeto,
} = require('../controllers/projetoController');

const router = express.Router();

// GET - retorna todos pesquisadores
router.get('/', getAllProjetos);

// GET - retorna um único pesquisador
router.get('/:id', getProjeto);

// GET - retorna lista de pesquisadores de um projeto
router.get('/pesquisadoresPorProjeto/:id', getPesquisadoresByProject);
// POST - cria um pesquisador
router.post('/adicionaProjeto', createProjeto);

// UPDATE - atualiza um pesquisador
router.patch('/:id', updateProjeto);

// DELETE - deleta um pesquisador
router.delete('/:id', deleteProjeto);

module.exports = router;
