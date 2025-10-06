import React from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";


function ListNotes({notes, deleteNote, startEdit, handleDeleteClick}) {
  const categoryStyles  = {
    personal: "bg-blue-200 border-blue-400",
    study: "bg-green-200 border-green-400",
    work: "bg-yellow-200 border-yellow-400"
  }

  const labelStyles = {
    personal: "bg-blue-500",
    study: "bg-green-500",
    work: "bg-yellow-500",
  };

  
  return (
    <div className='notes-container'>
        { notes.map((note) => {
            const key = (note.category || "other").toString().trim().toLowerCase();
            const cardClass = categoryStyles[key] || "bg-gray-50 border-gray-300";
            const tagClass = labelStyles[key] || "bg-gray-400";
            return(
                <div  key={note.id} className={`note border ${cardClass}`}>
                <div className='flex justify-between'>
                  <h2 className='font-bold font-indie text-lg mb-2'>{note.title}</h2>
                  <div className='flex mt-0 p-0'>
                    <button className='btn m-1 p-1 text-xl text-red-500 hover:text-red-700' onClick={() => handleDeleteClick(note.id)}><MdDeleteForever /></button>
                    <button className='btn m-1 p-1 text-xl text-blue-500 hover:text-blue-700' onClick={() => startEdit(note)}><FaEdit /></button>
                  </div>
                </div>
                    <span className={`px-2 py-1 rounded ${tagClass} text-white font-semibold text-xs`}>{note.category}</span>
                    <p className='text-sm mb-2 mt-2 font-indie font-normal'>{note.content}</p>
                </div>
            )})
        }
    </div>
  )
}

export default ListNotes