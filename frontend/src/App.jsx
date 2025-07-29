import React from 'react'
import { Routes, Route } from 'react-router'
import { Toaster, toast } from 'react-hot-toast'

import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import NoteDetailPage from './pages/NoteDetailPage'

const App = () => {
  return (
    // <div data-theme="luxury">
    <div className="relative h-full w-full">
    <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 
    bg-[radial-gradient(125%_125%_at_50%_10%,#000_60%,#FFD700_100%)]" />

      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
      
    </div>
  )
}

export default App