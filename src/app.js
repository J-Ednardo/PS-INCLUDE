import express from 'express'

const app = express()

//indicar para ler o express leer body com json
app.use(express.json())

//mock
const noticias = [
    {id: 1, tema: 'Brasil', publicacao: 'G'},
    {id: 2, tema: 'Suiça', publicacao: 'G'},
    {id: 3, tema: 'Camarões', publicacao: 'G'},
    {id: 4, tema: 'Sérvia', publicacao: 'G'}
]

//vai retornar o objeto através de uma busca por id
function buscarNoticiaPorId(id){
    return noticias.filter( posts => posts.id == id)
}

//vai procurar o index da notícia no array através do id
function buscarIndexNoticia(id){
    return noticias.findIndex(noticias => noticias.id == id)
}

//criar rota raiz
app.get('/', (req, res) => {
    res.send('Curso de Node JS')
})

app.get('/noticias', (req, res) => {
    res.send(noticias)
})

app.get('/noticias/:id', (req, res) => {
    res.json(buscarNoticiaPorId(req.params.id))
})

app.post('/noticias', (req, res) => {
    noticias.push(req.body)
    res.status(201).send('Notícia cadastrada com sucesso!')
})

app.delete('/noticias/:id', (req, res) => {
    let index = buscarIndexNoticia(req.params.id)
    noticias.splice(index, 1)
    res.send(`Notícia com id ${req.params.id} excluída com sucesso!`)
})

export default app