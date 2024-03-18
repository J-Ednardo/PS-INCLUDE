import express from 'express'

const app = express()

//indicar para ler o express leer body com json
app.use(express.json())

//mock
const selecoes = [
    {id: 1, tema: 'Brasil', publicacao: 'G'},
    {id: 2, tema: 'Suiça', publicacao: 'G'},
    {id: 3, tema: 'Sérvia', publicacao: 'G'},
    {id: 4, tema: 'Camarões', publicacao: 'G'}
]

//criar rota raiz
app.get('/', (req, res) => {
    res.send('Curso de Node JS')
})

app.get('/selecoes', (req, res) => {
    res.send(selecoes)
})

app.post('/selecoes', (req, res) => {
    selecoes.push(req.body)
    res.status(201).send('Seleção cadastrada com sucesso')

})
 
export default app