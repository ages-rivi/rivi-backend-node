const express = require('express');
const {
  createArtigo,
  getAllArtigos,
  getAllArtigosPorId,
  getArtigo,
  updateArtigo,
  deleteArtigo,
} = require('../controllers/artigoController');

const router = express.Router();

// GET - retorna todos artigos
router.get('/', getAllArtigos);

// GET - retorna o Id de todos os artigos
router.get('/artigosId', getAllArtigosPorId);

// GET - retorna um único artigo
router.get('/:id', getArtigo);

// POST - cria um artigo
router.post('/addArticle', createArtigo);

// UPDATE - atualiza um artigo
router.patch('/:id', updateArtigo);

// DELETE - deleta um artigo
router.delete('/:id', deleteArtigo);

module.exports = router;
