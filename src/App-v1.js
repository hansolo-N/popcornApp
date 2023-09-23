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

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];
const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];


  
const api_url = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&`




export default function App() {

  const [movies, setMovies] = useState([]);
  const [watched,setWatched] = useState(tempWatchedData);
  const [isLoading,setIsLoading] = useState(false)
  const [error,setError] = useState("")


  //api request to fetch movie data
  async function searchMovies(){
    setIsLoading(true)
    try {
      const response = await fetch(api_url+"s=inception")

      if(!response.ok){
        throw new Error ("something went wrong with fetching lovie list")
      }
      const data = await response.json()
      setMovies(data.Search)

      if(data.response ==="False" ) throw new Error("Movie not found")
      
    } catch (err) {
      console.log(err.message)
      setError(err.message)
    }
    finally{
      setIsLoading(false) 
    }


  }

function ErrorMessage({message}){
  
  return <p className="error">
    <span>🙈</span>{message}
  </p>

}



  
//loads movie data on mount
  useEffect(function(){
  
   searchMovies()
   
  },[])

  return (
    <>
      <Nav >
        <Logo/>
        <Search/>
        <Results movies={movies}/>
      </Nav>
      <Main>
        <Box>
          {isLoading && <Loader/>}
          {!isLoading && !error && <List movies={movies}/>}
          {error && <ErrorMessage message={error}/>}
        </Box>
        <Box>
          <Summary watched={watched}/>
          <WatchedMoviesList watched={watched}/>
        </Box>
      </Main>
      
    </>
  );
}