document.addEventListener('DOMContenteLoaded', function() {
    fetchNews()
})

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
    const recentPostDiv = document.querySelector('.postsrecents')
    recentPostDiv.innerHTML = ''

    noticias.forEach(noticia => {
        const newsItem = document.createElement('div')
        newsItem.className = 'news-item'

        const title = document.createElement('h2')
        title.className = 'article'
        title.textContent = noticia.tema

        newsItem.appendChild(title)

        recentPostDiv.appendChild(newsItem)
    })
}

async function addPublish(event) {
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
        document.getElementById(publication).value = ''
    }catch(error){
        console.error('Erro na publicação', error)
    }
}









