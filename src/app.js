import express from 'express'
import NoticiaController from './app/controllers/NoticiaController.js'

const app = express()

//indicar para ler o express leer body com json
app.use(express.json())

//Rotas
app.get('/noticias', NoticiaController.index)
app.get('/noticias/:id', NoticiaController.show)

//Rota para cadastrar novas noticias
app.post('/noticias', NoticiaController.store)

//Rota para editar uma noticia
app.put('/noticias/:id', NoticiaController.update)

//Rota para deletar uma noticia
app.delete('/noticias/:id', NoticiaController.delete)

export default app
