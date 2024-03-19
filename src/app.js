import express from 'express'
import conexao from '../infra/conexao.js'

const app = express()

//indicar para ler o express leer body com json
app.use(express.json())

//Rota para cadastrar novas noticias
app.post('/noticias', (req, res) => {
    const noticia= req.body
    const sql = 'INSERT INTO noticias SET ?;'
    conexao.query(sql, noticia,(erro, resultado) =>{
        if(erro){
            res.status(400).json({'erro': erro})
        }else{
            res.status(201).json(resultado)
        }
    })
})

//Rotas
app.get('/noticias', (req, res) => {
    const sql = 'SELECT * FROM noticias;'
    conexao.query(sql, (erro, resultado) =>{
        if(erro){
            res.status(404).json({'erro': erro})
        }else{
            res.status(200).json(resultado)
        }
    })
})

app.get('/noticias/:id', (req, res) => {
    const id = req.params.id
    const sql = 'SELECT * FROM noticias WHERE id=?;'
    conexao.query(sql, id,(erro, resultado) =>{
        const linha = resultado[0]
        if(erro){
            res.status(404).json({'erro': erro})
        }else{
            res.status(200).json(linha)
        }
    })
})

//Rota para editar uma noticia
app.put('/noticias/:id', (req, res) => {
    const noticia= req.body
    const id = req.params.id
    const sql = 'UPDATE noticias SET ? WHERE id=?;'
    conexao.query(sql, [noticia, id],(erro, resultado) =>{
        if(erro){
            res.status(400).json({'erro': erro})
        }else{
            res.status(200).json(resultado)
        }
    })
})

//Rota para deletar uma noticia
app.delete('/noticias/:id', (req, res) => {
    const id = req.params.id
    const sql = 'DELETE FROM noticias WHERE id=?;'
    conexao.query(sql, id, (erro, resultado) =>{
        if(erro){
            res.status(404).json({'erro': erro})
        }else{
            res.status(200).json(resultado)
        }
    })
})

//vai retornar o objeto através de uma busca por id
function buscarNoticiaPorId(id){
    return noticias.filter( posts => posts.id == id)
}

//vai procurar o index da notícia no array através do id
function buscarIndexNoticia(id){
    return noticias.findIndex(noticias => noticias.id == id)
}

export default app
