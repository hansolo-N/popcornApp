import React from 'react'

function SelectedMovie({selectedId,handleCloseMovie}) {
  return (
    
    <div className='details'>
        <button className='btn-back' onClick={handleCloseMovie}>&larr;</button>
        {selectedId}
    </div>

  )
}

export default SelectedMovie