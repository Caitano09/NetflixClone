import React, { useEffect, useState } from 'react'

import './App.css'
import Api from './Api'
import Header from './components/Header'
import MovieRow from './components/MovieRow'
import FeaturedMovie from './components/FeaturedMovie'

function App() {
  const [movieList, setMovieList] = useState([])
  const [featuredData, setFeaturedData] = useState(null)
  const [blackHeader, setBlackHeader] = useState(false)

  useEffect(() => {
    //Pegando a lista TOTAL
    const loadAll = async () => {
      let list = await Api.getHomeList()
      setMovieList(list)

      //Pegando o Featured
      let originals = list.filter(item => item.slug === 'originals')
      let randomchosen = Math.floor(Math.random() * originals[0].items.data.results.length - 1)
      let chosen = originals[0].items.data.results[randomchosen]
      let chosenInfo = await Api.getMovieInfo(chosen.id, 'tv')
      setFeaturedData(chosenInfo)
    }

    loadAll()
  }, [])

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true)
      } else {
        setBlackHeader(false)
      }
    }

    window.addEventListener('scroll', scrollListener)
    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, [])

  return (
    <div className="page">

      <Header black={blackHeader} />
      {featuredData && <FeaturedMovie item={featuredData} />}

      <section className="lists">
        {movieList.length > 0 && movieList.map((item, key) => {
          return <MovieRow key={key} title={item.title} items={item.items} />
        })}
      </section>

      <footer>
        Feito com <span role="img" aria-label="coração">❤️</span> por Daniel Caitano<br />
        Direitos de imagem para Netflix<br />
        Dados pegos do site themoviedb.org
      </footer>

      {movieList.length <= 0 &&
        <div className="loading">
          <img src="https://cdn.lowgif.com/small/0534e2a412eeb281-the-counterintuitive-tech-behind-netflix-s-worldwide.gif" alt="Carregando..." />
        </div>
      }
    </div>
  )
}

export default App;
