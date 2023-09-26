import React from 'react'

function Results({ movies }) {
  return (
    <p className="num-results">
      {movies?<strong>Found {movies.length} Results</strong>:<strong>Found 0 Results</strong>}
      
    </p>
  );
}

export default Results