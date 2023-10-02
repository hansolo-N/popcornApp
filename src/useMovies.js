import { useState,useEffect } from "react";
const api_url = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&`

export function useMovies(query){
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [movies, setMovies] = useState([]);



    useEffect(function(){
        // callback?.()

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
        // handleCloseMovie()
        searchMovies()
         
        return function(){
          controller.abort()
        }
      },[query])
      return {isLoading,error,movies}
}  