import React from 'react'
import { Link } from 'react-router-dom';
import { PenSquareIcon, Trash2Icon } from 'lucide-react';
import { formatDate } from '../lib/utils';
import api from '../lib/axios.js'; // Adjust the import path as necessary
import toast from 'react-hot-toast';

const NoteCard = ({note, setNotes}) => {

  const handleDelete = async (e,id) => {
    e.preventDefault();
   if(!window.confirm("Are you sure you want to delete this note?")) return;

   try {
    await api.delete(`/notes/${id}`);
    setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    toast.success("Note deleted successfully!");
   } catch (error) {
    console.log(`Delete note with id: ${id}`);
    toast.error("Failed to delete note. Please try again.");
   }
  };

  return <Link to={`/note/${note._id}`}
  className="card bg-base-100 shadow-lg hover:shadow-lg transition-all duration-250 border-t-4 border-solid border-[#b8ae29]"
  >
   <div className="card-body">
  <h3 className="card-title text-base-content">{note.title}</h3>
  <p className="text-base-content/70 line-clamp-3">{note.content}</p>
  
  <div className="card-actions justify-between items-center mt-4">
  <span className="text-sm text-base-content/60">
  {note.createdAt
    ? formatDate(Number(note.createdAt)) // Konvertera till nummer innan du skickar
    : "No Date"}
</span>

    
    <div className="flex items-center gap-1">
      <PenSquareIcon className="size-4" />
      <button className="btn btn-ghost btn-xs text-error" onClick={(e) => handleDelete(e, note._id)}>
        <Trash2Icon className="size-4" />
      </button>
    </div>
  </div>
</div>

  </Link>;
}

export default NoteCard
