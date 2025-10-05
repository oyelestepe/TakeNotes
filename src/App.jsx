import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import ListNotes from './components/ListNotes'
import NoteForm from './components/NoteForm'
import { IoMdAddCircle } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

function App() {
const [notes, setNotes] = useState(() => {
  const storedNotes = localStorage.getItem("notes");
  return storedNotes ? JSON.parse(storedNotes) : [];
})
const [editingNote, setEditingNote] = useState(null)
const [selectedCategory, setSelectedCategory] = useState("All")
const [currentPage, setCurrentPage] = useState(1)
const [showModal, setShowModal] = useState(false)
const categories = ["All", ...new Set(notes.map((note) => note.category))]
const filteredNotes = selectedCategory === "All" ? notes : notes.filter((note) => note.category === selectedCategory);
const notesPerPage = 10;
const indexOffLastNote = currentPage * notesPerPage;
const indexOffFirstNote = indexOffLastNote - notesPerPage;
const currentNotes = filteredNotes.slice(indexOffFirstNote, indexOffLastNote)
const totalPages = Math.ceil(filteredNotes.length / notesPerPage);
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
  setShowModal(false)
  }
 }

 function deleteNote(id){
  setNotes(prev => prev.filter(note => note.id !== id)) 
 }

 function updateNote(id, updatedData){
  setNotes(prevNotes => prevNotes.map(note => note.id === id ? {...note, ...updatedData} : note))
  setEditingNote(null)
  setShowModal(false)
}

function startEdit(note){
  setEditingNote(note)
  setShowModal(true)
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
      <div className='flex justify-between items-center p-2'>
      <IoMdAddCircle size={30} className='text-blue-600 cursor-pointer hover:text-blue-800' onClick={() => {setEditingNote(null); setShowModal(true)}}/>
        <div>
          <label>Filter by Category :</label>
          <select className='border rounded-sm ' value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              {categories.map((cat, i) => (
            <option key={i} value={cat}>
            {cat}
            </option>
          ))}
        </select>
        </div>
        
        <div className='flex items-center p-2'>
        {notes.length > 0 ? <p>You have <span className='font-semibold'>{notes.length}</span> notes</p> : <p>You dont have note yet</p>}
        <button className='btn btn-primary ml-2 ' onClick={deleteAllNotes}>Delete All Notes</button>
      </div>
      </div>
      <ListNotes notes={currentNotes} deleteNote={deleteNote} startEdit={startEdit}/>
      {
        showModal && (
          <div className='fixed inset-0 bg-black/75 flex justify-center items-center z-50' onClick={() => setShowModal(false)}>
            <div className='relative bg-white p-6 rounded-lg w-[90%] max-w-xl shadow-lg' onClick={(e) => e.stopPropagation()}>
              <h2>Add New Note</h2>
              <button className='absolute top-2 right-3 text-2xl text-gray-500 hover:text-black cursor-pointer' onClick={() => setShowModal(false)}><IoMdClose /></button>
                <NoteForm addNote={addNote} updateNote={updateNote} editingNote={editingNote} setEditingNote={setEditingNote} setShowModal={setShowModal}/>
            </div>
          </div>
        )
      }
      <div className=''>
          <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>Prev</button>

          {Array.from({ length: totalPages}, (_,i) => (
            <button 
              key={i} onClick={() => setCurrentPage(i + 1)}>
                {i +1}
            </button>
          ))}
          <button onClick={() => setCurrentPage(prev => Math.min(prev +1, totalPages))}>Next</button>
      </div>
    </>
  )
}

export default App
