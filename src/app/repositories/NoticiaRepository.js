import conexao from "../database/conexao.js"

class NoticiaRepository {
    //CRUD
    create(noticia) {
        const sql = 'INSERT INTO noticias SET ?;'
        return new Promise((resolve, reject) =>{
            conexao.query(sql, noticia,(erro, resultado) => {
                if(erro) return reject('Não foi possível cadastrar!')
                const row = JSON.parse(JSON.stringify(resultado))
                return resolve(row)
            })
        })
    }

    findAll() {
        const sql = 'SELECT * FROM noticias;'
        return new Promise((resolve, reject) =>{
            conexao.query(sql, (erro, resultado) => {
                if(erro) return reject('Não foi possível localizar!')
                const row = JSON.parse(JSON.stringify(resultado))
                return resolve(row)
            })
        })
    }

    findById(id) {
        const sql = 'SELECT * FROM noticias WHERE id=?;'
        return new Promise((resolve, reject) =>{
            conexao.query(sql, id,(erro, resultado) => {
                if(erro) return reject('Não foi possível localizar!')
                const row = JSON.parse(JSON.stringify(resultado))
                return resolve(row)
            })
        })
    }

    update(noticia, id) {
        const sql = 'UPDATE noticias SET ? WHERE id=?;'
        return new Promise((resolve, reject) =>{
            conexao.query(sql, [noticia, id], (erro, resultado) => {
                if(erro) return reject('Não foi possível atualizar!')
                const row = JSON.parse(JSON.stringify(resultado))
                return resolve(row)
            })
        })
    }

    delete(id) {
        const sql = 'DELETE FROM noticias WHERE id=?;'
        return new Promise((resolve, reject) =>{
            conexao.query(sql, id,(erro, resultado) => {
                if(erro) return reject('Não foi possível apagar!')
                const row = JSON.parse(JSON.stringify(resultado))
                return resolve(row)
            })
        })
    }
}

export default new NoticiaRepository()
