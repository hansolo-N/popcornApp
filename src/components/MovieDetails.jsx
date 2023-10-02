import React from 'react'
import { useEffect,useState } from 'react'
import Rating from "./rating/Rating"
import Loader from './Loader'

const api_url = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&`

function MovieDetails({selectedId,handleCloseMovie,onAddWatched,watched,handleDelete}) {
const [movie,setMovie] = useState('')
const [isLoading,setIsLoading] = useState(false)
const [userRating,setUserRating] = useState(null)

const isWatched = watched.map((movie)=>movie.imdbID).includes(selectedId)

const watchedUserRating = watched.find((movie)=> movie.imdbID===selectedId)?.userRating


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

useEffect(function(){
  if(!title) return
  document.title = `Movie | ${title}`

  return () =>{
    document.title= "Movie App"
  }
  
},[title])

useEffect(function(){
  function callback(e){
    if(e.code==="Escape"){
      handleCloseMovie()
    }
  }

  document.addEventListener('keydown',callback)

  return function (){
    document.removeEventListener('keydown',callback)
  }
},[handleCloseMovie]) 

function handleAdd(){
  const newWatchedMovie = {
    imdbID:selectedId,
    Title:title,
    year,
    imdbRating: Number(imdbRating),
    runtime: Number(runtime.split(" ").at(0)),
    Poster:poster,
    userRating

  }

onAddWatched(newWatchedMovie)
handleCloseMovie()
}

function handleUserRating(rating){
  setUserRating(rating)
}



  return (
    <div className='details'>
      {isLoading? <Loader/>:
      <>
      <header>
      <button className='btn-back' onClick={handleCloseMovie}>&larr;</button>
        
        <img src={poster} alt={`Poster of ${movie} movie`}></img>
        <div className='details-overview'>
          <h2>{title}</h2>
          <p>{released}&bull;{runtime}&bull;{year}</p>
          <p>{genre}</p>
          <p><span>⭐</span>{imdbRating} Imdb rating</p>
        </div>
        
      </header>
      <section>
        <div className='rating'>
          {!isWatched?(
            <>
            <Rating numStars={10} size={25} getUserRating={handleUserRating}/>
        {
          userRating > 0  && (<button className='btn-add' onClick={()=>handleAdd(movie)}>+add to List</button>)
        }{" "}</>
          ):(
            <p>you have already rated the movie, you have given it a rating of ⭐{watchedUserRating}</p>
          )}
        
        
        </div>
        <p><em>{plot}</em></p>
        <p>starring {actors}</p>
        <p>directed by {director}</p>
      </section>
      {/* {selectedId} */}
      </>}
 
    </div>

  )
}

export default MovieDetails