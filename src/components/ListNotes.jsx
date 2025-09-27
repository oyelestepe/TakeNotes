import React from 'react'

function ListNotes({notes, deleteNote}) {
  return (
    <div>
        {
            notes.map((note) => (
                <div key={note.id}>
                    <h2>{note.title}</h2>
                    <p>{note.content}</p>
                    <span>{note.category}</span>
                    <button onClick={() => deleteNote(note.id)}>X</button>
                </div>
            ))
        }
    </div>
  )
}

export default ListNotes