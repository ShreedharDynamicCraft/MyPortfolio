import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { ProfileProvider } from './lib/ProfileContext'
import Portfolio from './pages/Portfolio'
import ProjectsPage from './pages/ProjectsPage'
import EditProfile from './pages/EditProfile'
import BookPage from './pages/BookPage'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProfileProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/book" element={<BookPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="*" element={<Portfolio />} />
        </Routes>
      </BrowserRouter>
    </ProfileProvider>
  </React.StrictMode>,
)
