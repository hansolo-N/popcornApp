import React from 'react'
import Movie from './Movie'

function List({movies,handleId}) {
  return (
    <ul className="list list-movies">
              {movies?.map((movie) => (
                <Movie key={movie.imdbID} movie={movie} handleID={()=>handleId(movie.imdbID)}/>
              ))}
    </ul>
  )
}

export default List