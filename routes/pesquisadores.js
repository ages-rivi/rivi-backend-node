const express = require('express');
const {
  createPesquisador,
  getPesquisadores,
  getPesquisador,
  updatePesquisador,
  deletePesquisador,
} = require('../controllers/pesquisadorController');

const router = express.Router();

router.get('/', (getPesquisadores) => {
  res.json({ mssg: 'RETORNA todos os pesquisadores' });
});

router.get('/:id', (getPesquisador) => {
  res.json({ mssg: 'RETORNA um pesquisador' });
});

router.post('/', (req, res) => {
  res.json({ mssg: 'CRIA um novo pesquisador' });
});

router.post('/adicionaPesquisador', (createPesquisador) => {
  res.json({ mssg: 'CRIA um novo pesquisador' });
});

router.patch('/:id', (updatePesquisador) => {
  res.json({ mssg: 'ATUALIZA um pesquisador' });
});

router.delete('/:id', (deletePesquisador) => {
  res.json({ mssg: 'DELETA um pesquisador' });
});

module.exports = router;
