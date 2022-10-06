const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET - retorna todos artigos
const getAllArtigos = async (req, res) => {
  try {
    const artigos = await prisma.artigo.findMany();
    console.log(artigos);
    return res.json(artigos);
  } catch (error) {
    return res.json({ error: error.message });
  }
};

// GET - retorna um único artigo
const getArtigo = async (req, res) => {
  try {
    const { id } = req.params;
    const artigo = await prisma.artigo.findUnique({
      where: {
        id: id,
      },
    });
    if (!artigo) {
      return res.json({ error: 'Não foi possível encontrar este artigo.' });
    }
    console.log(artigo);
    return res.json(artigo);
  } catch (error) {
    return res.json({ error: error.message });
  }
};

// POST - cria um artigo
const createArtigo = async (req, res) => {
  const { doi, titulo, descricao, citacao, afiliacao, link, tag, pesquisadores } = req.body;

  try {
    artigo = await prisma.artigo.create({
      data: {
        doi,
        titulo,
        descricao,
        citacao,
        afiliacao,
        link,
        tag: tag,
        pesquisadores: {
          create: [
            pesquisadores.nome,
            pesquisadores.email,
            pesquisadores.descricao,
            pesquisadores.afiliacao,
            pesquisadores.tag,
            pesquisadores.foto,
            pesquisadores.contatos,
          ],
        },
      },
    });
    res.status(200).json(artigo);
    //res.json({ mssg: 'Novo artigo criado!' });
    console.log(artigo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// UPDATE - atualiza um artigo
const updateArtigo = async (req, res) => {
  try {
    const { id } = req.params;
    const { doi, titulo, descricao, citacao, afiliacao, link, tag, pesquisadores } = req.body;

    let artigo = await prisma.artigo.findUnique({
      where: {
        id: id,
      },
    });
    if (!artigo) {
      return res.json({ error: 'Não foi possível encontrar este artigo.' });
    }

    artigo = await prisma.artigo.update({
      where: {
        id: id,
      },
      data: {
        doi,
        titulo,
        descricao,
        citacao,
        afiliacao,
        link,
        tag: tag,
        pesquisadores: {
          create: [
            pesquisadores.nome,
            pesquisadores.email,
            pesquisadores.descricao,
            pesquisadores.afiliacao,
            pesquisadores.tag,
            pesquisadores.foto,
            pesquisadores.contatos,
          ],
        },
      },
    });
    console.log(artigo);
    return res.json(artigo);
  } catch (error) {
    return res.json({ error });
  }
};

// DELETE - deleta um artigo
const deleteArtigo = async (req, res) => {
  try {
    const { id } = req.params;
    let artigo = await prisma.artigo.findUnique({
      where: {
        id: id,
      },
    });
    if (!artigo) {
      return res.json({ error: 'Não foi possível encontrar este artigo.' });
    }

    await prisma.artigo.delete({
      where: {
        id: id,
      },
    });
    return res.json({ mssg: 'artigo deletado!' });
  } catch (error) {
    return res.json({ error });
  }
};

module.exports = {
  createArtigo,
  getAllArtigos,
  getArtigo,
  updateArtigo,
  deleteArtigo,
};
