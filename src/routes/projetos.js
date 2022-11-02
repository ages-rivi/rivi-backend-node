const express = require('express');
var controller = require('../controllers/projetoController');

const router = express.Router();

/**
 * // Descreve o componente Projeto
 *
 * @swagger
 * components:
 *   schemas:
 *     Projeto:
 *       type: object
 *       required:
 *         - titulo
 *         - descricao
 *         - estado
 *         - tags
 *         - pesquisadoresIds
 *       properties:
 *         titulo:
 *            type: string
 *         descricao:
 *            type: string
 *         estado:
 *            type: string
 *            enum: ['ativo', 'finalizado']
 *         tags:
 *            type: array
 *            items:
 *              type: string
 *            description: array de tags que o projeto possui.
 *         pesquisadoresIds:
 *            type: array
 *            items:
 *              type: string
 *            description: array de id's dos pesquisadores vinculados a este projeto.
 *       example:
 *         titulo: Cyberbullying entre adolescentes brasileiros
 *         descricao: Ultimamente destacam-se os esforços...
 *         estado: ativo
 *         tags: [Cyberbullying, Autoestima, Depressão]
 *         pesquisadoresIds: [6338da2020e0b5c916df9917, 6338df7e68a0b1749472b8cd]
 */

/**
 * // Descreve o componente de retorno de Projeto
 *
 * @swagger
 * components:
 *   schemas:
 *     Projeto_Response:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         titulo:
 *           type: string
 *         descricao:
 *           type: string
 *         estado:
 *           type: string
 *           enum: ['ativo', 'finalizado']
 *         tags:
 *           description: array de tags que o projeto possui.
 *           type: array
 *           items:
 *             type: string
 *         pesquisadoresIds:
 *           type: array
 *           items:
 *             type: string
 *         pesquisadores:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               nome:
 *                 type: string
 *               afiliacao:
 *                 type: string
 *           description: array de pesquisadores que o projeto possui.
 *       example:
 *         id: 635c6925615b609229191048
 *         titulo: Cyberbullying entre adolescentes brasileiros
 *         descricao: Ultimamente destacam-se os esforços...
 *         estado: ativo
 *         tags: [Cyberbullying, Autoestima, Depressão]
 *         pesquisadoresIds: [6338da2020e0b5c916df9917, 6338df7e68a0b1749472b8cd]
 *         pesquisadores:
 *           - id: 6338da2020e0b5c916df9917
 *             nome: Lucas
 *             afiliacao: PUCRS
 *           - id: 6338df7e68a0b1749472b8cd
 *             nome: Fernando
 *             afiliacao: UFGRS
 */

/**
 * // GET - retorna todos Projetos
 *
 * @swagger
 * /api/projeto:
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
 *                 $ref: '#/components/schemas/Projeto_Response'
 *      '400':
 *         description: Requisição falhou.
 */
router.get('/', controller.getAllProjetos);

/**
 * // GET - retorna um único Projeto
 *
 * @swagger
 * /api/projeto/{id}:
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
 *               $ref: '#/components/schemas/Projeto_Response'
 *      '404':
 *         description: Não foi possível encontrar este projeto.
 *      '400':
 *         description: Requisição falhou.
 */
router.get('/:id', controller.getProjeto);

/**
 * // POST - cria um Projeto
 *
 * @swagger
 * /api/projeto/adicionaProjeto:
 *  post:
 *    summary: Retorna todos os projetos.
 *    tags: [Projeto]
 *    requestBody:
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
 *               $ref: '#/components/schemas/Projeto_Response'
 *      '400':
 *         description: Requisição falhou.
 */
router.post('/adicionaProjeto', controller.createProjeto);

/**
 * // PATCH - atualiza um Projeto
 *
 * @swagger
 * /api/projeto/{id}:
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
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Projeto'
 *    responses:
 *      '200':
 *         description: Sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Projeto_Response'
 *      '404':
 *         description: Não foi possível encontrar este projeto.
 *      '400':
 *         description: Requisição falhou.
 */
router.patch('/:id', controller.updateProjeto);

/**
 * // DELETE - deleta um Projeto
 *
 * @swagger
 * /api/projeto/{id}:
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
router.delete('/:id', controller.deleteProjeto);

module.exports = router;
