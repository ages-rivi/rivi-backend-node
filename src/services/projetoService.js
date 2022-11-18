const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
var { CannotFindProjectError } = require('../errors/projetoError');

module.exports = {
  // GET - retorna todos projetos
  getAllProjetos: async function (req, res) {
    const projetos = await prisma.projeto.findMany({
      select: {
        id: true,
        titulo: true,
        descricao: true,
        estado: true,
        tags: true,
        link: true,
        pesquisadoresIds: true,
        pesquisadores: {
          select: {
            id: true,
            nome: true,
            afiliacao: true,
          },
        },
      },
    });
    console.log(projetos);
    return projetos;
  },

  // GET - retorna um único projeto
  getProjeto: async function (req, res) {
    const { id } = req.params;
    const projeto = await findUniqueProjeto(id);
    if (!projeto) {
      throw new CannotFindProjectError('Não foi possível encontrar este projeto.');
    }
    console.log(projeto);
    return projeto;
  },

  // POST - cria um projeto
  createProjeto: async function (req, res) {
    const { titulo, descricao, estado, tags, link, pesquisadoresIds } = req.body;
    let novosPesquisadores = pesquisadoresIds.map((element) => {
      return { id: element };
    });
    const projeto = await prisma.projeto.create({
      data: {
        titulo,
        descricao,
        estado,
        tags: tags != null ? tags : undefined,
        link,
        pesquisadores: {
          connect: novosPesquisadores,
        },
      },
    });
    console.log(projeto);
    return projeto;
  },

  // UPDATE - atualiza um projeto
  updateProjeto: async function (req, res) {
    const { id } = req.params;
    const { titulo, descricao, estado, tags, link, pesquisadoresIds } = req.body;

    let projeto = await findUniqueProjeto(id);
    if (!projeto) {
      throw new CannotFindProjectError('Não foi possível encontrar este projeto.');
    }

    // Verifica a adição e remoção de pesquisadores de um projeto
    if (pesquisadoresIds != null) {
      let deletaPesquisadores = projeto.pesquisadoresIds
        .filter((element) => pesquisadoresIds.includes(element))
        .map((element) => {
          return { id: element };
        });
      let adicionaPesquisadores = pesquisadoresIds
        .filter((element) => !projeto.pesquisadoresIds.includes(element))
        .map((element) => {
          return { id: element };
        });

      if (deletaPesquisadores.length > 0) {
        projeto = await prisma.projeto.update({
          where: { id: id },
          data: {
            pesquisadores: { disconnect: deletaPesquisadores },
          },
        });
      }
      if (adicionaPesquisadores.length > 0) {
        projeto = await prisma.projeto.update({
          where: { id: id },
          data: {
            pesquisadores: { connect: adicionaPesquisadores },
          },
        });
      }
    }

    projeto = await prisma.projeto.update({
      where: {
        id: id,
      },
      data: {
        titulo,
        descricao,
        estado,
        tags: tags,
        link,
      },
    });
    console.log(projeto);

    return projeto;
  },

  // DELETE - deleta um projeto
  deleteProjeto: async function (req, res) {
    const { id } = req.params;
    let projeto = await findUniqueProjeto(id);

    if (!projeto) {
      throw new CannotFindProjectError('Não foi possível encontrar este projeto.');
    }

    projeto = await prisma.projeto.delete({
      where: {
        id: id,
      },
    });
    console.log(projeto);
  },
};

async function findUniqueProjeto(id) {
  const projeto = await prisma.projeto.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      titulo: true,
      descricao: true,
      estado: true,
      tags: true,
      link: true,
      pesquisadoresIds: true,
      pesquisadores: {
        select: {
          id: true,
          nome: true,
          afiliacao: true,
        },
      },
    },
  });
  return projeto;
}
