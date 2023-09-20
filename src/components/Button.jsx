import React from 'react'
import { useState } from 'react';

function Button({isOpen,setIsOpen}) {
  return (
    <button
    className="btn-toggle"
    onClick={() => setIsOpen((isOpen) => !isOpen)}
  >
    {isOpen ? "–" : "+"}
  </button>
  )
}

export default Button