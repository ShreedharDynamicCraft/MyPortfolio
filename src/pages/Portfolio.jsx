import { useState } from 'react'
import { BookOpen } from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Hero from '../components/sections/Hero'
import Experience from '../components/sections/Experience'
import Projects from '../components/sections/Projects'
import TechStack from '../components/sections/TechStack'
import Achievements from '../components/sections/Achievements'
import Contact from '../components/sections/Contact'
import BookMode from '../components/book/BookMode'
import { getSeasonalTheme } from '../lib/theme'

export default function Portfolio() {
  const [theme] = useState(() => getSeasonalTheme(new Date()))
  const [book, setBook] = useState(false)

  return (
    <div className="min-h-screen overflow-x-hidden transition-[background] duration-1000" style={{ background: theme.bg }}>
      <div className="fixed inset-0 bg-grid-pattern opacity-5 pointer-events-none" aria-hidden="true" />
      <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full opacity-10 animate-float3D" />
        <div className="absolute top-1/3 right-32 w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg opacity-15 animate-pulse3D" />
        <div className="absolute bottom-40 left-1/4 w-28 h-28 bg-gradient-to-r from-green-400 to-emerald-500 rotate-45 opacity-10 animate-rotateY" />
      </div>

      <div className="relative">
        <Navbar />
        <main>
          <Hero />
          <Experience />
          <Projects />
          <TechStack />
          <Achievements />
          <Contact />
        </main>
        <Footer />
      </div>

      <button
        onClick={() => setBook(true)}
        className="fixed bottom-8 left-8 z-50 inline-flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-brand to-purple-600 text-white font-semibold shadow-2xl hover:scale-105 transition-transform"
        aria-label="Open book view"
      >
        <BookOpen className="w-5 h-5" /> <span className="hidden sm:inline">Book view</span>
      </button>

      {book && <BookMode onClose={() => setBook(false)} />}
    </div>
  )
}
