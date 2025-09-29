import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import ListNotes from './components/ListNotes'
import NoteForm from './components/NoteForm'

function App() {
const [notes, setNotes] = useState([])
const [editingNote, setEditingNote] = useState(null)

 function addNote(note){
 const newNote = {...note, id: Date.now()};
 setNotes(prev => [...prev, newNote])
 }

 function deleteNote(id){
  setNotes(prev => prev.filter(note => note.id !== id)) 
 }

 function updateNote(id, updatedData){
  setNotes(prevNotes => prevNotes.map(note => note.id === id ? {...note, ...updatedData} : note))
  setEditingNote(null)
}

function startEdit(note){
  setEditingNote(note)
}
  return (
    <>
      <Navbar />
      <NoteForm addNote={addNote} updateNote={updateNote} editingNote={editingNote} setEditingNote={setEditingNote}/>
      <ListNotes notes={notes} deleteNote={deleteNote} startEdit={startEdit}/>
    </>
  )
}

export default App
