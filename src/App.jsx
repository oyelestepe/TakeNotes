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
const [selectedCategory, setSelectedCategory] = useState("All")

const categories = ["All", ...new Set(notes.map((note) => note.category))]
const filteredNotes = selectedCategory === "All" ? notes : notes.filter((note) => note.category === selectedCategory);

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

function deleteAllNotes(){
  if(notes.length > 0 ){
    setNotes([])
  } else {
    alert("There is no note to delete")
  }
  
}
  return (
    <>
      <Navbar />
      <NoteForm addNote={addNote} updateNote={updateNote} editingNote={editingNote} setEditingNote={setEditingNote}/>
      <div>
        <label>Filter by Category:</label>
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            {categories.map((cat, i) => (
      <option key={i} value={cat}>
        {cat}
      </option>
    ))}
        </select>
      </div>
      <ListNotes notes={filteredNotes} deleteNote={deleteNote} startEdit={startEdit}/>
      <div>
        <button onClick={deleteAllNotes}>Delete All Notes</button>
      </div>
    </>
  )
}

export default App
