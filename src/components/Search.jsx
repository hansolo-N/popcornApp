import React from 'react'
import { useRef,useEffect } from 'react'

function Search({query,setQuery}) {
  
useEffect(function(){

  if(document.activeElement ===inputElement.current)
    return


  function callback(e){
    if(e.code==="Enter"){
      inputElement.current.focus()
      setQuery("")
    }
    
  }

  return ()=>{
    document.addEventListener("keydown",(callback))
  }


  
},[setQuery])


  const inputElement = useRef(null)
  return (
    <input
          className="search"
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          ref={inputElement}
        />
  )
}

export default Search