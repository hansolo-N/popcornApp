import React from 'react'
import { useEffect,useState } from 'react'
import Rating from "./rating/Rating"
import Loader from './Loader'

const api_url = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&`

function MovieDetails({selectedId,handleCloseMovie}) {
const [movie,setMovie] = useState('')
const [isLoading,setIsLoading] = useState(false)

const {Title:title,
  Year:year, 
  Poster:poster,
  Runtime:runtime,
  imdbRating,Plot:
  plot,
  Release:released,
  Actors:actors,
  Director:director,
  Genre:genre} = movie

  console.log(title,runtime)
useEffect(function(){

async function getMovieDetails(id){
  
  try {
    setIsLoading(true)
    const response = await fetch(api_url+`i=${id}`)
    const data = await response.json()
    setMovie(data)
    setIsLoading(false)
  } catch (error) {
    console.log(error)
  }
  
}
getMovieDetails(selectedId)
},[selectedId])

  return (
    <div className='details'>
      {isLoading? <Loader/>:
      <>
      <header>
      <button className='btn-back' onClick={handleCloseMovie}>&larr;</button>
        
        <img src={poster} alt={`Poster of ${movie} movie`}></img>
        <div className='details-overview'>
          <h2>{title}</h2>
          <p>{released}&bull;{runtime}</p>
          <p>{genre}</p>
          <p><span>⭐</span>{imdbRating} Imdb rating</p>
        </div>
        
      </header>
      <section>
        <div className='rating'>
        <Rating numStars={10} size={25}/>
        </div>
        <p><em>{plot}</em></p>
        <p>starring {actors}</p>
        <p>directed by {director}</p>
      </section>
      {selectedId}
      </>}
 
    </div>

  )
}

export default MovieDetails