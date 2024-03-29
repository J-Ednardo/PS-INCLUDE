import express from 'express'
import routes from './routes.js'
import cors from "cors"

const app = express()

//indicar para ler o express ler body com json
app.use(express.json())

app.use(cors())
//usar o router
app.use(routes)



export default app
