import React from 'react'
import { useState } from 'react'



function Rating({numStars}) {
const [rating,setRating] = useState(0)


const containerStyle = {
  display: "flex",
  alignItems: 'center',
  gap: "16px",
  color:"yellow"
}

const starContainer = {
  display: "flex",
  gap: "4px"
}

const textStyle = {
  lineHeight: "1",
  margin: "0"


}
  return (
    <div style={containerStyle}>
      <div style={starContainer}>
      {Array.from({length:numStars},(_,i)=><span>S{i+1 }</span>)}
      </div>
      <p style={textStyle}>10</p>
    </div>
  )
}

export default Rating