import React, { useState, useEffect } from 'react';
// import {LoaderCircle} from 'react-hot-toast';
import toast from "react-hot-toast";
import { useNavigate, useParams } from 'react-router-dom';
import api from "../lib/axios.js"; 
import { LoaderCircle, ArrowLeftIcon, Trash2Icon } from 'lucide-react';
import { Link } from "react-router-dom";


const NoteDetailPage = () => {
  const [note,setNote] = useState(null);
  const [loading, setLoading] = useState(true);   
  const [Saving, setSaving] = useState(false);

  const navigate = useNavigate();

const {id} = useParams();

console.log("Note ID:", id);

useEffect(() => { 
  const fetchNote = async () => {
    try{
      const res = await api.get(`/notes/${id}`);
      setNote(res.data);
      console.log("Fetched note:", res.data);
    }
    catch(error) {
      console.error("Error fetching note:", error);
      toast.error("Failed to fetch note. Please try again later.");
    } finally {
      setLoading(false);
    }
  }
  fetchNote();
}
, [id]);

const handleDelete = async () => {
  if (!window.confirm("Are you sure you want to delete this note?")) return;

  try {
    await api.delete(`/notes/${id}`);
    toast.success("Note deleted successfully!");
    navigate("/");
  } catch (error) {
    console.error("Error deleting note:", error);
    toast.error("Failed to delete note. Please try again.");
  }
};

const handleSave = async () => {
  if (!note || !note.title?.trim() || !note.content?.trim()) {
    toast.error("Title and content cannot be empty.");
    return;
  }

  console.log("Saving note:", note);
  console.log("Note ID:", id);

  setSaving(true);
  try {
    await api.put(`/notes/${id}`, note);
    toast.success("Note saved successfully!");
    navigate(`/`);
  } catch (error) {
    console.error("Error saving note:", error);
    toast.error("Failed to save note. Please try again.");
  } finally {
    setSaving(false);
  }
};


if (loading) {
  return ( 
    <div className="min-h-screen bg-base-200 flex justify-center items-center">
      <LoaderCircle className="size-10 animate-spin text-yellow" />
    </div>
  );
}

return (
  <div className="min-h-screen bg-base-200">
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="btn btn-ghost">
            <ArrowLeftIcon className="h-5 w-5" />
            Back to Notes
          </Link>

          <button
            onClick={handleDelete}
            className="btn btn-error btn-outline"
          >
            <Trash2Icon className="h-5 w-5" />
            Delete Note
          </button>
        </div>
        
        <div className="card bg-base-100">
  <div className="card-body">
    <div className="form-control mb-4">
      <label className="label">
        <span className="label-text">Title</span>
      </label>
      <input
        type="text"
        placeholder="Note title"
        className="input input-bordered"
        value={note.title}
        onChange={(e) => setNote({ ...note, title: e.target.value })}
      />
        </div>

    <div className="form-control mb-4">
      <label className="label">
        <span className="label-text">Content</span>
      </label>
      <textarea
        className="textarea textarea-bordered h-48"
        placeholder="Note content"
        value={note.content}
        onChange={(e) => setNote({ ...note, content: e.target.value })}
      />
         </div>

    <div className="card-actions justify-end">
      <button
        className="btn btn-primary" disabled={Saving}
        onClick={async () => { await handleSave(); }} >
  {Saving ? <LoaderCircle className="size-5 animate-spin" /> : "Save Note"}
      </button>
    </div>
        </div>
       </div>
      </div>
    </div>
  </div>
);
}


export default NoteDetailPage
