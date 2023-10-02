import { useState } from 'react';
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
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";
  





export default function App() {
  const [query, setQuery] = useState("");
  const [selectId,setSelectedId] = useState(null)
  const {movies,isLoading,error} = useMovies(query,handleCloseMovie)

  const [watched,setWatched] = useLocalStorageState([],"watched")

  // const [watched, setWatched] = useState(function(){
  // const localMoviesStorage = localStorage.getItem('watched')
  //   return JSON.parse(localMoviesStorage)
  // })


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