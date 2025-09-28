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
    <form className='flex flex-col w-lg border border-gray-300 border-solid p-3 m-2 rounded-xl '
      onSubmit={handleSubmit}>
        <label className='form-label'>Title :</label>
        <input className='form-input' 
          placeholder='Enter title' type='text' name='title' value={formData.title} onChange={handleTakeNote}/>
        <label className='form-label'>Content :</label>
        <textarea className='form-input' 
          placeholder='Enter your content...' type='text' name='content' value={formData.content} onChange={handleTakeNote}/>
        <label className='form-label'>Choose a category :</label>
        <select className='form-input'
          name='category' value={formData.category} onChange={handleTakeNote}>
            <option value="Personal">Personal</option>
            <option value="Work">Work</option>
            <option value="Study">Study</option>
        </select>
        <button className='btn btn-primary' type='submit'>Take Note</button>
    </form>
  )
}

export default NoteForm