const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET - retorna todos pesquisadores
const getPesquisadores = async (req, res) => {
  const pesquisadores = await prisma.pesquisador.findMany();
  console.log(pesquisadores);
};

// GET - retorna um único pesquisador
const getPesquisador = async (req, res) => {
  const pesquisador = await prisma.pesquisador.findUnique({
    where: {
      id: '6338da2020e0b5c916df9917',
    },
  });
  console.log(pesquisadores);
};

// POST - cria um pesquisador
const createPesquisador = async (req, res) => {
  const { nome, email, descricao, afiliacao, tag, foto, contatos, projetos, artigos } = req.body;
  try {
    const pesquisador = await prisma.pesquisador.create({
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
    res.status(200).json(pesquisador);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

  res.json({ mssg: 'CRIA um novo pesquisador' });
};

// UPDATE - atualiza um pesquisador
const updatePesquisador = async (req, res) => {};

// DELETE - deleta um pesquisador
const deletePesquisador = async (req, res) => {};

module.exports = {
  getPesquisadores,
  getPesquisadores,
  createPesquisador,
  updatePesquisador,
  deletePesquisador,
};
