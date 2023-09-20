import React from 'react'
import Movie from './Movie'

function List({movies}) {
  return (
    <ul className="list">
              {movies?.map((movie) => (
                <Movie key={movie.imdbID} movie={movie}/>
              ))}
    </ul>
  )
}

export default List