import { consulta } from "../database/conexao.js"

class NoticiaRepository {
    //CRUD
    create(noticia) {
        const sql = 'INSERT INTO noticias SET ?;'
        return consulta(sql, noticia, 'Não foi possível cadastrar!')
    }

    findAll() {
        const sql = 'SELECT * FROM noticias;'
        return consulta(sql, 'Não foi possível localizar!')
    }

    findById(id) {
        const sql = 'SELECT * FROM noticias WHERE id=?;'
        return consulta(sql, id, 'Não foi possível localizar!')
    }

    update(noticia, id) {
        const sql = 'UPDATE noticias SET ? WHERE id=?;'
        return consulta(sql, [noticia, id], 'Não foi possível atualizar!')
    }

    delete(id) {
        const sql = 'DELETE FROM noticias WHERE id=?;'
        return consulta(sql, id, 'Não foi possível apagar!')
    }
}

export default new NoticiaRepository()
