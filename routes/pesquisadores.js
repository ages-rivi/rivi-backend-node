const express = require('express');
const {
  createPesquisador,
  getAllPesquisadores,
  getPesquisador,
  updatePesquisador,
  deletePesquisador,
} = require('../controllers/pesquisadorController');

const router = express.Router();

// GET - retorna todos pesquisadores
router.get('/', getAllPesquisadores);

// GET - retorna um único pesquisador
router.get('/:id', getPesquisador);

// POST - cria um pesquisador
router.post('/adicionaPesquisador', createPesquisador);

// UPDATE - atualiza um pesquisador
router.patch('/:id', updatePesquisador);

// DELETE - deleta um pesquisador
router.delete('/:id', deletePesquisador);

module.exports = router;
