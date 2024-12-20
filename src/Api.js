import axios from 'axios'

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3' 
})

const API_KEY = 'ea398a29969444a4e2411b80efd796db'

/*
    originais netflix
    recomendados(trending)
    em alta(top rated)
    acão
    comédia
    terror
    romance 
    documentário
*/

const basicFetch = async (url) =>{
    const response = await api.get(url)
    
    return response
}

const getHomeList = async() =>{
    return [
        {
            slug: 'originals',
            title: 'Originais do Netflix',
            items: await basicFetch(`/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`)
        },
        {
            slug: 'trending',
            title: 'Recomendados para Você' ,
            items: await basicFetch(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`)
        },
        {
            slug: 'toprated',
            title: 'Em Alta' ,
            items: await basicFetch(`/movie/top_rated?language=pt-BR&api_key=${API_KEY}`)
        },
        {
            slug: 'action',
            title: 'Ação' ,
            items: await basicFetch(`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`)
        },
        {
            slug: 'comedy',
            title: 'Comédia' ,
            items: await basicFetch(`/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`)
        },
        {
            slug: 'horror',
            title: 'Terror' ,
            items: await basicFetch(`/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`)
        },
        {
            slug: 'romance',
            title: 'Romance' ,
            items: await basicFetch(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`)
        },
        {
            slug: 'documentary',
            title: 'Documentário' ,
            items: await basicFetch(`/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`)
        }
    ]
}

const getMovieInfo = async(movieId, typeMovie) =>{
    let info = {}

    if(typeMovie){
        switch(typeMovie){
            case 'movie':
                info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`)
                break
            case 'tv':
                info = await basicFetch(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`)
                break
            default:
                info = null
                break
        }
    }

    return info
}

// eslint-disable-next-line
export default {getHomeList, getMovieInfo}