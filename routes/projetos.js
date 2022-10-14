const express = require('express');
const {
  getAllProjetos,
  getProjeto,
  createProjeto,
  updateProjeto,
  deleteProjeto,
} = require('../controllers/projetoController');

const router = express.Router();

// Descreve o componente projeto
/**
 * @swagger
 * components:
 *   schemas:
 *     Projeto:
 *       type: object
 *       required:
 *         - titulo
 *         - descricao
 *         - estado
 *         - tag
 *         - pesquisadoresIds
 *       properties:
 *         titulo:
 *            type: string
 *         descricao:
 *            type: string
 *         estado:
 *            type: string
 *            enum: ['ativo', 'finalizado']
 *         tag:
 *            type: array
 *            items:
 *              type: string
 *            description: array de tags que o projeto possui.
 *         pesquisadoresIds:
 *            type: array
 *            items:
 *              type: string
 *            description: array de id's dos pesquisadores vinculados a este projeto.
 */

// GET - retorna todos pesquisadores
/**
 * @swagger
 * /api/projetos:
 *  get:
 *    summary: Retorna todos os projetos.
 *    tags: [Projeto]
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
 *                   - $ref: '#/components/schemas/Projeto'
 *      '400':
 *         description: Requisição falhou.
 */
router.get('/', getAllProjetos);

// GET - retorna um único pesquisador
/**
 * @swagger
 * /api/projetos/{id}:
 *  get:
 *    summary: Retorna um projeto a partir de seu id.
 *    tags: [Projeto]
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
 *                 - $ref: '#/components/schemas/Projeto'
 *      '404':
 *         description: Não foi possível encontrar este projeto.
 *      '400':
 *         description: Requisição falhou.
 */
router.get('/:id', getProjeto);

// POST - cria um pesquisador
/**
 * @swagger
 * /api/projetos/adicionaProjeto:
 *  post:
 *    summary: Retorna todos os projetos.
 *    tags: [Projeto]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Projeto'
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
 *                 - $ref: '#/components/schemas/Projeto'
 *      '400':
 *         description: Requisição falhou.
 */
router.post('/adicionaProjeto', createProjeto);

// UPDATE - atualiza um pesquisador
/**
 * @swagger
 * /api/projetos/{id}:
 *  patch:
 *    summary: Atualiza um projeto a partir de seu id.
 *    tags: [Projeto]
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
 *                 - $ref: '#/components/schemas/Projeto'
 *      '404':
 *         description: Não foi possível encontrar este projeto.
 *      '400':
 *         description: Requisição falhou.
 */
router.patch('/:id', updateProjeto);

// DELETE - deleta um pesquisador
/**
 * @swagger
 * /api/projetos/{id}:
 *  delete:
 *    summary: Deleta um projeto a partir de seu id.
 *    tags: [Projeto]
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
router.delete('/:id', deleteProjeto);

module.exports = router;
