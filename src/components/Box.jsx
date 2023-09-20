import React from 'react'
import { useState } from 'react';
import Button from './Button';


function Box({children}) {
    const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
    <Button isOpen ={isOpen} setIsOpen ={setIsOpen}/>
  {isOpen && (
        {children}
  )}
</div>

  )
}

export default Box