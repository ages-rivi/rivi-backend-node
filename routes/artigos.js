const express = require('express');
const {
  createArtigo,
  getAllArtigos,
  getArtigo,
  updateArtigo,
  deleteArtigos,
} = require('../controllers/artigoController');

const router = express.Router();

// GET - retorna todos artigos
router.get('/', getAllArtigos);

// GET - retorna um único artigo
router.get('/:id', getArtigo);

// POST - cria um artigo
router.post('/adicionaArtigo', createArtigo);

// UPDATE - atualiza um artigo
router.patch('/:id', updateArtigo);

// DELETE - deleta um artigo
router.delete('/:id', deleteArtigos);

module.exports = router;
