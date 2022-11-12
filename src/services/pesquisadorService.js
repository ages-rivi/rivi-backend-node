const { PrismaClient } = require('@prisma/client');
const { deletePesquisador } = require('../controllers/pesquisadorController');
const prisma = new PrismaClient();
const { ResearcherAlreadyExists, CannotFindResearcherError } = require('../errors/pesquisadorError');

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
    if (pesquisador) {
      throw new ResearcherAlreadyExists('Pesquisador com esse e-mail já existe.');
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

  updatePesquisador: async (req, res) => {
    const { id } = req.params;
    const { nome, email, descricao, afiliacao, tag, foto, contatos, projetos, artigos } = req.body;

    let pesquisador = await prisma.pesquisador.findUnique({
      where: {
        id: id,
      },
    });
    if (!pesquisador) {
      throw new CannotFindResearcherError("Não foi possível encontrar este pesquisador.")
    }
    let adicionaProjetos = 0
    if (projetos) {
      adicionaProjetos = projetos.filter(element => !pesquisador.projetosIds.includes(element)).map(function (element) {
        return { id: element };
      });
    }
    let deletaProjetos = pesquisador.projetosIds.filter(element => projetos.includes(element)).map(function (element) {
      return { id: element };
    });

    if (deletaProjetos.length > 0) {
      pesquisador = await prisma.pesquisador.update({
        where: { id: id },
        data: {
          projetos: { disconnect: deletaProjetos }
        }
      });
    }
    if (adicionaProjetos.length > 0) {
      pesquisador = await prisma.pesquisador.update({
        where: { id: id },
        data: {
          projetos: { connect: adicionaProjetos }
        }
      });
    }

    contatos.forEach(contato => {
      pesquisador.contatos.push(contato)
    });

    let updatedPesquisador = await prisma.pesquisador.update({
      where: {
        id: id,
      },
      data: {
        nome,
        email,
        descricao,
        afiliacao,
        tag: tag,
        foto: foto,
        contatos: pesquisador.contatos,
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
    console.log(updatedPesquisador);
    return updatedPesquisador;
  },

  deletePesquisador: async (req, res) => {

    const { id } = req.params;
    let pesquisador = await prisma.pesquisador.findUnique({
      where: {
        id: id,
      },
    });
    if (!pesquisador) {
      throw new CannotFindResearcherError('Não foi possível encontrar este pesquisador.');
    }

    await prisma.pesquisador.delete({
      where: {
        id: id,
      },
    });
    return ('Pesquisador deletado!');
  }
};