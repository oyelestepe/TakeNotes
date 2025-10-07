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
const [showDeleteModal, setShowDeleteModal] = useState(false)
const [noteToDelete, setNoteToDelete] = useState(null)
const [showDeleteAllModal, setShowDeleteAllModal] = useState(false)
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
  const newNote = {...note, 
      id: crypto.randomUUID(), 
      date: new Date().toLocaleString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit',}).replace(',', '')
};
  setNotes(prev => [...prev, newNote]) 
  setShowModal(false)
  }
 }

 function deleteNote(id){
  setNotes(prev => prev.filter(note => note.id !== id)) 
 }

 function handleDeleteClick(id){
  setNoteToDelete(id);
  setShowDeleteModal(true)
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
        <button className='btn btn-primary ml-2 ' onClick={() => setShowDeleteAllModal(true)}>Delete All Notes</button>
        
      </div>
      
      </div>
      {
        showDeleteAllModal && (
          <div onClick={() => setShowDeleteAllModal(false)} className='fixed inset-0 bg-black/75 flex justify-center items-center z-50'>
            <div onClick={(e) => e.stopPropagation()} className='relative bg-white p-6 rounded-lg w-[90%] max-w-xl shadow-lg'>
              <h2 className='text-xl font-semibold mb-4 '>Delete All?</h2>
              <p className='text-lg mb-4'>Are you sure you want to delete all notes? This action cannot be undone.</p>
              <div className='flex justify-center gap-4'>
                <button onClick={() => setShowDeleteAllModal(false)} className='bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md cursor-pointer'>Cancel</button>
                <button onClick={() => {deleteAllNotes(); setShowDeleteAllModal(false)}} className='bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md cursor-pointer'>Delete</button>
              </div>
            </div>
          </div>
        )
      }
      <ListNotes notes={currentNotes} deleteNote={deleteNote} startEdit={startEdit} handleDeleteClick={handleDeleteClick}/>
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
      {
        showDeleteModal && (
          <div onClick={() => setShowDeleteModal(false)} className='fixed inset-0 bg-black/60 flex justify-center items-center z-50'>
            <div onClick={(e) => e.stopPropagation()} className='bg-white rounded-lg p-6 shadow-md w-[90%] max-w-sm text-center'>
              <h2 className='text-xl font-semibold mb-4'>Delete note?</h2>
              <p className='text-gray-600 mb-6'>Are you sure you want to delete this note? This action cannot be undone.</p>
              <div className='flex justify-center gap-4'>
                <button onClick={() => setShowDeleteModal(false)} className='bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md cursor-pointer'>Cancel</button>
                <button className='bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md cursor-pointer'
                  onClick={() => {deleteNote(noteToDelete); setShowDeleteModal(false); setNoteToDelete(null)}}>Delete</button>
              </div>
            </div>
          </div>
        )
      }
      <div className='bg-yellow-200 flex justify-center mt-3'>
          <button className='btn bg-amber-500 rounded-2xl text-white ' onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>Prev</button>

          {Array.from({ length: totalPages}, (_,i) => (
            <button className='text-white font-bold text-xl p-1.5 m-1 bg-amber-400 rounded-xl cursor-pointer'
              key={i} onClick={() => setCurrentPage(i + 1)}>
                {i +1}
            </button>
          ))}
          <button className='btn bg-amber-500 rounded-2xl text-white ' onClick={() => setCurrentPage(prev => Math.min(prev +1, totalPages))}>Next</button>
      </div>
    </>
  )
}

export default App
