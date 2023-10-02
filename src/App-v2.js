import { useEffect, useState } from "react";
import Logo from './components/Logo'
import Search from './components/Search'
import Results from './components/Results'
import Nav from "./components/Nav";
import List from './components/List'
import Box from "./components/Box";
import Loader from "./components/Loader"
import Summary from './components/Summary'
import WatchedMoviesList from './components/WatchedMoviesList'
import Main from "./components/Main";
import MovieDetails from "./components/MovieDetails";


  
const api_url = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&`




export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  ;
  const [isLoading, setIsLoading] = useState(false);
  const [selectId,setSelectedId] = useState(null)
  const [error, setError] = useState("");
  const [watched, setWatched] = useState(function(){
    const localMoviesStorage = localStorage.getItem('watched')
    return JSON.parse(localMoviesStorage)
  })


function handleId(id){
  setSelectedId((selectId)=>selectId===id?null:id)
}

function handleCloseMovie(){
  setSelectedId(null)
}


function ErrorMessage({message}){
  
  return <p className="error">
    <span>🙈</span>{message}
  </p>

}

function handleAddWatch(movie){
  setWatched((watched)=>[...watched,movie])
  // localStorage.setItem('watched',JSON.stringify([...watched,movie]))
}

function handleDeleteWatched (id){
  setWatched(watched.filter((movie)=>movie.imdbID !== id))
}

useEffect(function(){
  localStorage.setItem('watched',JSON.stringify([watched]))
},[watched])


  //api request to fetch movie data
//loads movie data on mount
  useEffect(function(){
    const controller = new AbortController()
    
    async function searchMovies(){
     
      try {
        setIsLoading(true)
        setError("")

        const response = await fetch(api_url+`s=${query}`,{signal:controller.signal})
  
        if(!response.ok){
          throw new Error ("something went wrong with fetching lovie list")
        }
        const data = await response.json()
        setMovies(data.Search)
        setError("")
  
        if(data.response ==="False" ) throw new Error("Movie not found")
        
      } catch (err) {
        setError(err.message)

        if(err.name !== "AbortError"){
          setError(err.message)
        }
      }
      finally{
        setIsLoading(false) 
      }


      if(query.length<3){
        setMovies([])
        setError("")
        return
      }
      
    }
    handleCloseMovie()
    searchMovies()
     
    return function(){
      controller.abort()
    }
  },[query])



  return (
    <>
      <Nav >
        <Logo/>
        <Search query={query} setQuery={setQuery}/>
        <Results movies={movies}/>
      </Nav>
      <Main>
        <Box>
          {isLoading && <Loader/>}
          {!isLoading && !error && <List movies={movies} handleId={handleId}  handleCloseMovie={handleCloseMovie}/>}
          {error && <ErrorMessage message={error}/>}
        </Box>
        <Box>
          {selectId ? 
          <MovieDetails 
          selectedId={selectId} 
          handleCloseMovie={handleCloseMovie} 
          onAddWatched ={handleAddWatch} 
          watched={watched}
          />:
          <>
          <Summary watched={watched}/>
          <WatchedMoviesList watched={watched} handleDelete = {handleDeleteWatched}/>
          </>
          }
          
        </Box>
      </Main>
      
    </>
  );
}