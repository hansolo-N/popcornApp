import React from 'react'
import { useState } from 'react'
import Button from './Button'
import Summary from './Summary'
import WatchedMoviesList from './WatchedMoviesList'

function WatchedBox({movies,watched}) {
    const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
          <Button isOpen ={isOpen} setIsOpen ={setIsOpen}/>
          {isOpen && (
            <>
            <Summary watched={watched}/>
            <WatchedMoviesList movies={movies} watched={watched}/>
              
            </>
          )}
        </div>
  )
}

export default WatchedBox