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
import SelectedMovie from "./components/SelectedMovie";


  
const api_url = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&`




export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectId,setSelectedId] = useState(null)
  const [error, setError] = useState("");


function handleId(id){
  setSelectedId(id)
}

function handleCloseMovie(){
  setSelectedId(null)
}


function ErrorMessage({message}){
  
  return <p className="error">
    <span>🙈</span>{message}
  </p>

}
  //api request to fetch movie data
//loads movie data on mount
  useEffect(function(){
  
    async function searchMovies(){
      setIsLoading(true)
      setError("")
      try {
        const response = await fetch(api_url+`s=${query}`)
  
        if(!response.ok){
          throw new Error ("something went wrong with fetching lovie list")
        }
        const data = await response.json()
        setMovies(data.Search)
  
        if(data.response ==="False" ) throw new Error("Movie not found")
        
      } catch (err) {
        setError(err.message)
      }
      finally{
        setIsLoading(false) 
      }
  
      
    }
    searchMovies()
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
          {selectId ? <SelectedMovie selectedId={selectId} handleCloseMovie={handleCloseMovie}/>:
          <>
          <Summary watched={watched}/>
          <WatchedMoviesList watched={watched}/>
          </>
          }
          
        </Box>
      </Main>
      
    </>
  );
}