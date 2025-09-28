import React from 'react'

function ListNotes({notes, deleteNote}) {
  return (
    <div className='notes-container'>
        { notes.map((note) => (
                <div className='note' key={note.id}>
                    <h2 className='font-bold text-lg mb-2'>{note.title}</h2>
                    <p className='text-sm mb-2'>{note.content}</p>
                    <span className='px-2 py-1 rounded bg-yellow-400 text-white font-semibold text-xs'>{note.category}</span>
                    <button className='absloute top-1 right-2 text-red-500 hover:text-red-700' onClick={() => deleteNote(note.id)}>X</button>
                </div>
            ))
        }
    </div>
  )
}

export default ListNotes