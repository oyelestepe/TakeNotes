import React from 'react'

function NoteForm() {
  return (
    <form>
        <label>Title :</label>
        <input type='text' name='title'/>
        <label>Content :</label>
        <textarea type='text' name='content'/>
        <label>Choose a category :</label>
        <select name='category'>
            <option value="Personal">Personal</option>
            <option value="Work">Work</option>
            <option value="Study">Study</option>
        </select>
    </form>
  )
}

export default NoteForm