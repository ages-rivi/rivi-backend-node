const { PrismaClient } = require('@prisma/client');
const { ModuleResolutionKind } = require('typescript');
const prisma = new PrismaClient();
const service = require('../services/pesquisadorService');

module.exports = {

  
  // GET - retorna todos pesquisadores
  getAllPesquisadores: async (req, res) => {
    try {
      const pesquisadores = await service.getAllPesquisadores(req, res);
      return res.status(200).json(pesquisadores);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
  
  // GET - retorna um único pesquisador
  getPesquisador: async (req, res) => {
    try {
    const pesquisador = await service.getPesquisador(req, res)
    return res.status(200).json(pesquisador)
  } catch (error) {
    return res.json({ error: error.message });
  }
},

// POST - cria um pesquisador
createPesquisador: async (req, res) => {
    const pesquisador = service.createPesquisador(req, res)
    //return res.status(200).json(pesquisador)
},
};
/*

// UPDATE - atualiza um pesquisador
const updatePesquisador = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, descricao, afiliacao, tag, foto, contatos, projetos, artigos } = req.body;

    let pesquisador = await prisma.pesquisador.findUnique({
      where: {
        id: id,
      },
    });
    if (!pesquisador) {
      return res.json({ error: 'Não foi possível encontrar este pesquisador.' });
    }

    let adicionaProjetos = projetos.filter(element => !pesquisador.projetosIds.includes(element)).map(function(element) {
      return {id: element};
    });
    let deletaProjetos = pesquisador.projetosIds.filter(element => projetos.includes(element)).map(function(element) {
      return {id: element};
    });

    if(deletaProjetos.length > 0) {
      pesquisador = await prisma.pesquisador.update({
        where: {id: id},
        data: {
          projetos: { disconnect: deletaProjetos }
        }
      });
    } 
    if(adicionaProjetos.length > 0) {
      pesquisador = await prisma.pesquisador.update({
        where: {id: id},
        data: {
          projetos: { connect: adicionaProjetos }
        }
      });
    }

    pesquisador.contatos.push(contatos);
  
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
    return res.json(updatedPesquisador);
  } catch (error) {
    return res.json({ error });
  }
};

// DELETE - deleta um pesquisador
const deletePesquisador = async (req, res) => {
  try {
    const { id } = req.params;
    let pesquisador = await prisma.pesquisador.findUnique({
      where: {
        id: id,
      },
    });
    if (!pesquisador) {
      return res.json({ error: 'Não foi possível encontrar este pesquisador.' });
    }

    await prisma.pesquisador.delete({
      where: {
        id: id,
      },
    });
    return res.json({ mssg: 'Pesquisador deletado!' });
  } catch (error) {
    return res.json({ error });
  }
};

module.exports = {
  getAllPesquisadores,
  getPesquisador,
  createPesquisador,
  updatePesquisador,
  deletePesquisador,
};
*/