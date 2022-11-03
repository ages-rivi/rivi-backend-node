const express = require('express');
const {
  createPesquisador,
  getAllPesquisadores,
  getPesquisador,
  updatePesquisador,
  deletePesquisador,
} = require('../controllers/pesquisadorController');

const router = express.Router();

// Descreve o componente pesquisador
/**
 * @swagger
 * components:
 *   schemas:
 *     Pesquisador:
 *       type: object
 *       required:
 *         - nome
 *         - email
 *         - descricao
 *         - afiliacao
 *         - foto
 *         - linhaPesquisa
 *         - contato
 *         - artigo
 *         - projeto
 *         - tag
 *       properties:
 *         nome:
 *            type: string
 *         email:
 *            type: string
 *         descricao:
 *            type: string
 *         artigosIds:
 *            type: array
 *            items:
 *              type: string
 *              description: array de id's dos artigos vinculados a este pesquisador.
 *         projetoIds:
 *            type: array
 *            items:
 *              type: string
 *              description: array de id's dos projetos vinculados a este pesquisador.
 *         contato:
 *            type: array
 *            items:
 *              type: string
 *              description: array de contatos vinculados a este pesquisador.
 *         afiliacao:
 *            type: string
 *         foto:
 *            type: string
 *         tag:
 *            type: array
 *            items:
 *              type: string
 *            description: array de tags que o pesquisador possui.
 *         linhaPesquisaIds:
 *            type: array
 *            items:
 *              type: string
 *            description: array de id's das linhas de pesquisa vinculados a este pesquisador.
 */

// GET - retorna todos pesquisadores
/**
 * @swagger
 * /api/pesquisadores:
 *  get:
 *    summary: Retorna todos os pesquisadores.
 *    tags: [Pesquisador]
 *    responses:
 *      '200':
 *         description: Sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 allOf:
 *                   - type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                   - $ref: '#/components/schemas/Pesquisador'
 *      '400':
 *         description: Requisição falhou.
 */
router.get('/', getAllPesquisadores);

// GET - retorna um único pesquisador
/**
 * @swagger
 * /api/pesquisadores/{id}:
 *  get:
 *    summary: Retorna um projeto a partir de seu id.
 *    tags: [Pesquisador]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        description: Id de um projeto.
 *        required: true
 *    responses:
 *      '200':
 *         description: Sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                 - $ref: '#/components/schemas/Pesquisador'
 *      '404':
 *         description: Não foi possível encontrar este projeto.
 *      '400':
 *         description: Requisição falhou.
 */
router.get('/:id', getPesquisador);

// POST - cria um pesquisador
/**
 * @swagger
 * /api/pesquisadores/adicionaPesquisador:
 *  post:
 *    summary: Retorna todos os pesquisadores.
 *    tags: [Pesquisador]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Pesquisador'
 *    responses:
 *      '201':
 *         description: Novo projeto criado.
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                 - $ref: '#/components/schemas/Pesquisador'
 *      '400':
 *         description: Requisição falhou.
 */
router.post('/adicionaPesquisador', createPesquisador);

// UPDATE - atualiza um pesquisador
/**
 * @swagger
 * /api/pesquisadores/{id}:
 *  patch:
 *    summary: Atualiza um projeto a partir de seu id.
 *    tags: [Pesquisador]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        description: Id de um projeto.
 *        required: true
 *    responses:
 *      '200':
 *         description: Sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                 - $ref: '#/components/schemas/Pesquisador'
 *      '404':
 *         description: Não foi possível encontrar este projeto.
 *      '400':
 *         description: Requisição falhou.
 */
router.patch('/:id', updatePesquisador);

// DELETE - deleta um pesquisador
/**
 * @swagger
 * /api/pesquisadores/{id}:
 *  delete:
 *    summary: Deleta um projeto a partir de seu id.
 *    tags: [Pesquisador]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        description: Id de um projeto.
 *        required: true
 *    responses:
 *      '200':
 *         description: Sucesso.
 *      '404':
 *         description: Não foi possível encontrar este projeto.
 *      '400':
 *         description: Requisição falhou.
 */
router.delete('/:id', deletePesquisador);

module.exports = router;
