import React, { useState } from 'react'

function NoteForm({addNote}) {
const [formData, setFormData] = useState({title:"", content:"",category:""})
  
function handleTakeNote(e){
    const {name, value} = e.target;
    setFormData((prevState) => ({...prevState, [name]: value}))
  }

  function handleSubmit(e){
    e.preventDefault()
    addNote(formData)
    setFormData({title:"", content:"", category:"Personal"})
  }

  return (
    <form onSubmit={handleSubmit}>
        <label>Title :</label>
        <input type='text' name='title' value={formData.title} onChange={handleTakeNote}/>
        <label>Content :</label>
        <textarea type='text' name='content' value={formData.content} onChange={handleTakeNote}/>
        <label>Choose a category :</label>
        <select name='category' value={formData.category} onChange={handleTakeNote}>
            <option value="Personal">Personal</option>
            <option value="Work">Work</option>
            <option value="Study">Study</option>
        </select>
        <button type='submit'>Take Note</button>
    </form>
  )
}

export default NoteForm