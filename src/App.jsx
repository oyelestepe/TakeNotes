import { useState } from 'react'
import './App.css'
import ListNotes from './components/ListNotes'
import NoteForm from './components/NoteForm'

function App() {
const [notes, setNotes] = useState([])

 function addNote(note){
 const newNote = {...note, id: Date.now()};
 setNotes(prev => [...prev, newNote])
 }

 function deleteNote(id){
  setNotes(prev => prev.filter(note => note.id !== id)) 
 }
  return (
    <>
      <NoteForm addNote={addNote}/>
      <ListNotes notes={notes} deleteNote={deleteNote}/>
    </>
  )
}

export default App
