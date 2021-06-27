import React, {useState} from 'react'
import './MovieRow.css'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const MovieRow = ({ title, items }) => {

    const [scrollX, setScrollX] = useState(0)

    const handleLeftArrow = () =>{
        let valueScrollX = scrollX + Math.round(window.innerWidth / 2)

        if(valueScrollX > 0){
            valueScrollX = 0
        }
        setScrollX(valueScrollX)
    }

    const handleRightArrow = () =>{
        let valueScrollX = scrollX - Math.round(window.innerWidth / 2)
        let listMaxWidth = items.data.results.length * 150

        if(window.innerWidth - listMaxWidth > valueScrollX){
            valueScrollX = window.innerWidth - listMaxWidth - 60//60 é referente ao padding-left do ".movieRow--listarea" que está afetando cada seta (30+30)
        }
        setScrollX(valueScrollX)
    }

    return (
        <div className="movieRow">

            <h2>{title}</h2>

            <div className="movieRow--left" onClick={handleLeftArrow}>
                <NavigateBeforeIcon style={{ fontSize: 50 }} />
            </div>

            <div className="movieRow--right" onClick={handleRightArrow}>
                <NavigateNextIcon style={{ fontSize: 50 }} />
            </div>

            <div className="movieRow--listarea">
                <div className="movieRow--list" style={{
                    marginLeft: scrollX,
                    width: items.data.results.length * 150
                }}>

                    {items.data.results.length > 0 && items.data.results.map((item, key) => {
                        return (
                            <div key={key} className="movieRow--item">
                                <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title} />
                            </div>
                        )
                    })}

                </div>
            </div>
        </div>
    )
}

export default MovieRow