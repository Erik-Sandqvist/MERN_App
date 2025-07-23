import React from 'react'
import { Routes, Route } from 'react-router'
import { Toaster, toast } from 'react-hot-toast'

import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import NoteDetailPage from './pages/NoteDetailPage'

const App = () => {
  return (
    <div>
      {/* Toaster måste vara med för att visa notiser */}
      <Toaster />

      <button onClick={() => toast.success("congrats")}>Create Note</button>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  )
}

export default App