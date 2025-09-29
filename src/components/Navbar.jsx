import React from 'react'

function Navbar() {
  return (
    <nav className='bg-amber-200 flex flex-row justify-between p-3'>
       <span>Take Notes</span>
        <ul className='flex'>
            <li className='ml-3 mr-3'>Add new note</li>
            <li className='ml-3 mr-3'>Show Notes</li>
        </ul>
    </nav>
  )
}

export default Navbar