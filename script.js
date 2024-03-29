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

    noticias.forEach(noticia => {
        const newsItem = document.createElement('div')
        newsItem.className = 'news-item'

        const title = document.createElement('h2')
        title.className = 'article'
        title.textContent = noticia.tema

        newsItem.appendChild(title)

        recentPostsDiv.appendChild(newsItem)
    })
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
        const response = await axios.get("http://localhost:3000/noticias/15")
        const noticia = response.data

        document.getElementById("tema").textContent = noticia[0].tema || "Título não disponível"
        document.getElementById("msg").textContent = noticia[0].noticia
        if(noticia.imagem && document.querySelector('.postImage')){
            document.querySelector('.postImage').src = noticia.imagem
        }
    }catch(error){
        console.error('Erro ao carregar os detalhes da notícia', error)
    }
}

document.addEventListener('DOMContentLoaded', loadNewsDetails)
