import NoticiaRepository from "../repositories/NoticiaRepository.js"

let firstpubli = document.getElementById('firstpubli')
let secondpubli = document.getElementById('secondpubli')
let thirdpubli = document.getElementById('thirdpubli')

const addPublish = async function () {
    const title = document.getElementById('title').value
    const publication = document.getElementById('publication').value
    const response = await axios({
        method: "POST",
        url: "http://localhost:3000/noticias",
        data: {tema: title, noticia: publication},
        headers: {"Content-Type": "application/json"}
    })
}








