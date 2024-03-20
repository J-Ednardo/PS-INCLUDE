import { Router } from "express";
import NoticiaController from "./app/controllers/NoticiaController.js";

const router = Router()

//Rotas
router.get('/noticias', NoticiaController.index)
router.get('/noticias/:id', NoticiaController.show)

//Rota para cadastrar novas noticias
router.post('/noticias', NoticiaController.store)

//Rota para editar uma noticia
router.put('/noticias/:id', NoticiaController.update)

//Rota para deletar uma noticia
router.delete('/noticias/:id', NoticiaController.delete)

export default router
