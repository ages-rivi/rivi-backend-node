const express = require('express');
const controller = require('../controllers/pesquisadorController');

const router = express.Router();

// GET - retorna todos pesquisadores
router.get('/', controller.getAllPesquisadores);
// GET - retorna um único pesquisador
router.get('/:id', controller.getPesquisador);
// POST - cria um pesquisador
router.post('/adicionaPesquisador', controller.createPesquisador);
/*


// UPDATE - atualiza um pesquisador
router.patch('/:id', updatePesquisador);

// DELETE - deleta um pesquisador
router.delete('/:id', deletePesquisador);
*/
module.exports = router;
