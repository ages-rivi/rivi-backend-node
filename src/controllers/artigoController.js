const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET - retorna todos artigos
const getAllArtigos = async (req, res) => {
  try {
    const articles = await prisma.article.findMany();
    console.log(articles);
    return res.status(200).json(articles);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// GET - retorna todos artigos
const getAllArtigosPorId = async (req, res) => {
  try {
    const articlesIds = await prisma.article.findMany({
      select: {
        id: true,
      },
    });
    console.log(articlesIds);
    return res.status(200).json(articlesIds);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// GET - retorna um único artigo
const getArtigo = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await prisma.article.findUnique({
      where: {
        id: id,
      },
    });
    if (!article) {
      return res.status(404).json({ error: 'Não foi possível encontrar este artigo.' });
    }
    console.log(article);
    return res.status(200).json(article);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// POST - cria um artigo
const createArtigo = async (req, res) => {
  const {
    title,
    description,
    category,
    tags,
    abstract,
    authors,
    location,
    date,
    pdf_link,
    membersIds,
  } = req.body;

  try {
    article = await prisma.article.create({
      data: {
        title,
        description,
        category,
        tags: tags,
        abstract,
        authors: authors,
        location,
        date,
        pdf_link,
        membersIds: membersIds,
      },
    });
    console.log(article);
    return res.status(201).json(article);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// UPDATE - atualiza um artigo
const updateArtigo = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      category,
      tags,
      abstract,
      authors,
      location,
      date,
      pdf_link,
      membersIds,
    } = req.body;

    let article = await prisma.article.findUnique({
      where: {
        id: id,
      },
    });
    if (!article) {
      return res.status(404).json({ error: 'Não foi possível encontrar este artigo.' });
    }

    article = await prisma.article.update({
      where: {
        id: id,
      },
      data: {
        title,
        description,
        category,
        tags: tags,
        abstract,
        authors: authors,
        location,
        date,
        pdf_link,
        membersIds: membersIds,
      },
    });
    console.log(article);
    return res.status(200).json(article);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// DELETE - deleta um artigo
const deleteArtigo = async (req, res) => {
  try {
    const { id } = req.params;
    let article = await prisma.article.findUnique({
      where: {
        id: id,
      },
    });
    if (!article) {
      return res.status(404).json({ error: 'Não foi possível encontrar este artigo.' });
    }

    await prisma.article.delete({
      where: {
        id: id,
      },
    });
    return res.status(200).json({ mssg: 'artigo deletado!' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createArtigo,
  getAllArtigos,
  getAllArtigosPorId,
  getArtigo,
  updateArtigo,
  deleteArtigo,
};
