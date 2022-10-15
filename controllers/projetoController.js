const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET - retorna todos projetos
const getAllProjetos = async (req, res) => {
  try {
    const projetos = await prisma.projeto.findMany();
    console.log(projetos);
    return res.status(200).json(projetos);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// GET - retorna um único projeto
const getProjeto = async (req, res) => {
  try {
    const { id } = req.params;
    const projeto = await prisma.projeto.findUnique({
      where: {
        id: id,
      },
    });
    if (!projeto) {
      return res.status(404).json({ error: 'Não foi possível encontrar este projeto.' });
    }
    console.log(projeto);
    return res.status(200).json(projeto);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// POST - cria um projeto
const createProjeto = async (req, res) => {
  const { titulo, descricao, estado, tag, pesquisadores } = req.body;

  try {
    let novosPesquisadores = pesquisadores.map((element) => {return {id: element}});
    projeto = await prisma.projeto.create({
      data: {
        titulo,
        descricao,
        estado,
        tag: tag,
        pesquisadores: {
          connect: novosPesquisadores
        }
      },
    });
    console.log(projeto);
    return res.status(201).json(projeto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// UPDATE - atualiza um projeto
const updateProjeto = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descricao, estado, tag, pesquisadores } = req.body;

    let projeto = await prisma.projeto.findUnique({
      where: {
        id: id,
      },
    });
    if (!projeto) {
      return res.status(404).json({ error: 'Não foi possível encontrar este projeto.' });
    }

    let deletaPesquisadores = projeto.pesquisadoresIds.filter(element => pesquisadores.includes(element)).map((element) => {
      return {id: element};
    });
    let adicionaPesquisadores = pesquisadores.filter(element => !projeto.pesquisadoresIds.includes(element)).map((element) => {
      return {id: element};
    });
    
    if(deletaPesquisadores.length > 0) {
      projeto = await prisma.projeto.update({
        where: {id: id},
        data: {
          pesquisadores: { disconnect: deletaPesquisadores }
        }
      });
    }
    if(adicionaPesquisadores.length > 0) {
      projeto = await prisma.projeto.update({
        where: {id: id},
        data: {
          pesquisadores: { connect: adicionaPesquisadores }
        }
      });
    }
    
    projeto = await prisma.projeto.update({
      where: {
        id: id,
      },
      data: {
        titulo,
        descricao,
        estado,
        tag: tag,
      },
    });
    console.log(projeto);
    return res.status(200).json(projeto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE - deleta um projeto
const deleteProjeto = async (req, res) => {
  try {
    const { id } = req.params;
    let projeto = await prisma.projeto.findUnique({
      where: {
        id: id,
      },
    });
    if (!projeto) {
      return res.status(404).json({ error: 'Não foi possível encontrar este projeto.' });
    }

    await prisma.projeto.delete({
      where: {
        id: id,
      },
    });
    console.log(projeto);
    return res.status(200).json({ mssg: 'Projeto deletado!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllProjetos,
  getProjeto,
  createProjeto,
  updateProjeto,
  deleteProjeto,
};
