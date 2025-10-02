import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import ListNotes from './components/ListNotes'
import NoteForm from './components/NoteForm'

function App() {
const [notes, setNotes] = useState(() => {
  const storedNotes = localStorage.getItem("notes");
  return storedNotes ? JSON.parse(storedNotes) : [];
})
const [editingNote, setEditingNote] = useState(null)

// local storage 
useEffect(() => {
  localStorage.setItem("notes", JSON.stringify(notes));
}, [notes])

 function addNote(note){
  if (note.title.trim() == "" || note.content.trim() ==""){
    alert("type a note")
  } else {
 const newNote = {...note, id: crypto.randomUUID()};
 setNotes(prev => [...prev, newNote]) 
}
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
