import React from 'react'
import WatchedMovie from './WatchedMovie'

function WatchedMoviesList({watched,handleDelete}) {
  return (
    <ul className="list">
    {watched.map((movie) => (
      <WatchedMovie movie={movie} key={movie.imdbID} handleDelete={handleDelete}/>
    ))}
  </ul>
  )
}

export default WatchedMoviesList