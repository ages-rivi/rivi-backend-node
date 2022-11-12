const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
var { ResearcherAlreadyExists, CannotFindResearcherError } = require('../errors/pesquisadorError');

module.exports = {
  // GET - retorna todos pesquisadores
  getAllPesquisadores: async (req, res) => {
    const pesquisadores = await prisma.pesquisador.findMany();
    console.log(pesquisadores);
    return pesquisadores;
  },

  getPesquisador: async (req, res) => {
    const { id } = req.params;
    const pesquisador = await prisma.pesquisador.findUnique({
      where: {
        id: id,
      },
    });
    if (!pesquisador) {
      throw new CannotFindResearcherError('Não foi possível encontrar este pesquisador.');
    }
    console.log(pesquisador);
    return pesquisador;
  },

  createPesquisador: async (req, res) => {
    
    
    const { nome, email, descricao, afiliacao, tag, foto, contatos, projetos, artigos } = req.body;
    
    // valida se já existe email cadastrado
    let pesquisador = await prisma.pesquisador.findUnique({ where: { email } });
    try {
    if (pesquisador) {
      throw new ResearcherAlreadyExists('Pesquisador com esse e-mail já existe.');
    }
    } catch (ResearcherAlreadyExists) {
      res.status(400).json({ error: ResearcherAlreadyExists.message });
    }

    pesquisador = await prisma.pesquisador.create({
    data: {
      nome,
      email,
      descricao,
      afiliacao,
      tag: tag,
      foto: foto,
      contatos: contatos,
      projetos: {
        create: [projetos.titulo, projetos.descricao, projetos.estado, projetos.tag],
      },
      artigos: {
        create: [
          artigos.doi,
          artigos.titulo,
          artigos.descricao,
          artigos.citacao,
          artigos.afiliacao,
          artigos.link,
          artigos.tag,
        ],
      },
    },
    });
    console.log(pesquisador);
    return pesquisador;

  },

};