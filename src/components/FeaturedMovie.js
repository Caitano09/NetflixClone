import React from 'react'
import './FeaturedMovie.css'

const featuredMovie = ({ item }) => {

    let firstAirDate = new Date(item.data.first_air_date)
    let genres = []

    for (let i in item.data.genres) {
        genres.push(item.data.genres[i].name)
    }

    let description = item.data.overview
    if(description.length > 200){
        description = description.substring(0, 200)+'...'
    }

    return (
        <section className="featured" style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundImage: `url(https://image.tmdb.org/t/p/original${item.data.backdrop_path})`
        }}>
            <div className="featured--vertical">
                <div className="featured--horizontal">

                    <div className="featured--name">{item.data.original_name}</div>

                    <div className="featured--info">
                        <div className="featured--points">{item.data.vote_average} pontos</div>
                        <div className="featured--year">{firstAirDate.getFullYear()}</div>
                        <div className="featured--seasons">{item.data.number_of_seasons} temporada{item.data.number_of_seasons !== 1 ? 's' : ''}</div>
                    </div>

                    <div className="featured--description">{description}</div>

                    <div className="featured--buttons">
                        <a className="featured--watchbutton" href={`/watch/${item.data.id}`}>► Assistir</a>
                        <a className="featured--mylistbutton" href={`/list/add/${item.data.id}`}>+ Minha Lista</a>
                    </div>

                    <div className="featured--genres"><b>Generos: </b>{genres.join(', ')}</div>
                </div>
            </div>
        </section>
    )
}

export default featuredMovie