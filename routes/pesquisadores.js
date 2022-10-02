const { PrismaClient } = require('@prisma/client')
const express = require('express')
const prisma = new PrismaClient()

const router = express.Router()

router.get('/', (req, res) => {
    res.json({mssg: 'RETORNA todos os pesquisadores'})
})

router.get('/:id', (req, res) => {
    res.json({mssg: 'RETORNA um pesquisador'})
})

router.post('/', (req, res) => {
    res.json({mssg: 'CRIA um novo pesquisador'})
})

router.post('/adicionaPesquisador', async (req, res) => {
    const { nome, email, descricao, afiliacao, tag, foto, contatos, projetos, artigos} = req.body
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
                    create: [
                        projetos.titulo,
                        projetos.descricao,
                        projetos.estado,
                        projetos.tag,
                    ]
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
                    ]
                }
            }
        })
        res.status(200).json(pesquisador)
    } catch (error) {
        res.status(400).json({error: error.message})
    }   

    res.json({mssg: 'CRIA um novo pesquisador'})
})

router.delete('/:id', (req, res) => {
    res.json({mssg: 'DELETA um pesquisador'})
})

router.patch('/:id', (req, res) => {
    res.json({mssg: 'ATUALIZA um pesquisador'})
})

module.exports = router