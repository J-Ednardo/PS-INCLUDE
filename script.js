document.addEventListener('DOMContentLoaded', function() {
    fetchNews()
})

window.onload = function () {
    fetchNews()
}

async function fetchNews(){
    try{
        const response = await axios.get("http://localhost:3000/noticias")
        console.log(response.data)
        const noticias = response.data
        updateRecentNewsList(noticias)
    }catch(error){
        console.error("Erro ao buscar notícias", error)
    }
}

function updateRecentNewsList(noticias) {
    const recentPostsDiv = document.querySelector('.postsrecents')
    recentPostsDiv.innerHTML = '';

    const startIndex = noticias.length > 3 ? noticias.length - 3 : 0

    for (let i = startIndex; i < noticias.length; i++) {
        const noticia = noticias[i]

        const newsItem = document.createElement('div')
        newsItem.className = 'news-item'

        const title = document.createElement('h2')
        title.className = 'article'
        title.textContent = noticia.tema

        newsItem.appendChild(title)

        recentPostsDiv.appendChild(newsItem)
    }
}

function updateNewsList(noticias){
    if(noticias.length > 0){
        document.getElementById('firstpubli').textContent = noticias[0] ? noticias[0].tema : ''
        document.getElementById('secondpubli').textContent = noticias[1] ? noticias[1].tema : ''
        document.getElementById('thirdpubli').textContent = noticias[2] ? noticias[2].tema : ''
    }else{
        console.log('Não há notícias para mostrar')
    }
}


async function addPublish(event) {
    event.preventDefault()
    console.log('Função addPublish chamada!')
    const title = document.getElementById('title').value
    const publication = document.getElementById('publication').value
    try {
        const response = await axios({
            method: "POST",
            url: "http://localhost:3000/noticias",
            data: {tema: title, noticia: publication},
            headers: {"Content-Type": "application/json"}
        })
        console.log('Dados publicados', response.data)
        document.getElementById('title').value = ''
        document.getElementById('publication').value = ''
        window.location.reload()
    }catch(error){
        console.error('Erro na publicação', error)
    }
}

async function loadNewsDetails() {
    try{
        const response = await axios.get(`http://localhost:3000/noticias`)
        const noticias = response.data
        const ultimasNoticias = noticias[noticias.length - 1]
        
        document.getElementById("tema").textContent = ultimasNoticias.tema || "Título não disponível"
        document.getElementById("msg").textContent = ultimasNoticias.noticia
        if(noticias.imagem && document.querySelector('.postImage')){
            document.querySelector('.postImage').src = noticias.imagem
        }
    }catch(error){
        console.error('Erro ao carregar os detalhes da notícia', error)
    }
}

async function deletePublish(event) {
    event.preventDefault()
    console.log('Função deletePublish chamada!')
    try {
        const get = await axios.get(`http://localhost:3000/noticias`)
        const noticias = get.data
        const idUltimaNoticia = noticias[noticias.length - 1].id
        const response = await axios({
            method: "DELETE",
            url: `http://localhost:3000/noticias/` + idUltimaNoticia,
            headers: {"Content-Type": "application/json"}
        });
        console.log('Dados removidos', response.data)
        window.location.reload()
    } catch (error) {
        console.error("Não foi possível remover", error)
    }
}

//para atualizar é necessário primeiro escrever nas caixas de texto e depois clicar no botão
async function updatePublish(event) {
    event.preventDefault()
    console.log('Função updatePublish chamada!')
    const title = document.getElementById('title').value
    const publication = document.getElementById('publication').value
    try{
        const get = await axios.get(`http://localhost:3000/noticias`)
        const noticias = get.data
        const idUltimaNoticia = noticias[noticias.length - 1].id
        const response = await axios({
            method: "PUT",
            url: `http://localhost:3000/noticias/` + idUltimaNoticia,
            data: {tema: title, noticia: publication},
            headers: {"Content-Type": "application/json"}
        })
        console.log('Dados alterados', response.data)
        window.location.reload()
    }catch (error){
        console.error("Não foi possível alterar os dados", error)
    }
}

document.addEventListener('DOMContentLoaded', loadNewsDetails)
