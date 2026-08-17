import { useEffect, useState } from 'react'
import { useProfile } from '../../lib/ProfileContext'
import DocViewer from '../ui/DocViewer'

const NAV_ITEMS = [
  { href: '#about', label: 'Home' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#achievements', label: 'Achievements' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const { data } = useProfile()
  const { name, links } = data.profile
  const initial = name?.trim()?.charAt(0)?.toUpperCase() || 'S'

  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [showResume, setShowResume] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const openResume = () => {
    setMenuOpen(false)
    setShowResume(true)
  }

  const linkCls = 'group relative text-ink font-light hover:text-brand transition-colors duration-300 py-1'
  const underline = <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-gradient-to-r from-brand to-purple-500 rounded-full transition-all duration-300 group-hover:w-full" />

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white/90 backdrop-blur-xl shadow-lg shadow-brand/5' : 'bg-blue-50/80 backdrop-blur-sm'
      }`}
    >
      <nav className="flex justify-between items-center px-4 md:px-8 py-4 max-w-7xl mx-auto">
        <a href="#about" className="flex items-center gap-3 group" aria-label="Home">
          <span className="grid place-items-center w-10 h-10 rounded-lg bg-gradient-to-br from-brand to-purple-600 text-white font-bold text-lg shadow-md transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
            {initial}
          </span>
          <span className="text-lg md:text-xl font-medium text-ink group-hover:text-brand transition-colors duration-300">{name}</span>
        </a>

        <ul className="hidden lg:flex items-center gap-8 xl:gap-10">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <a href={item.href} className={linkCls}>
                {item.label}
                {underline}
              </a>
            </li>
          ))}
          <li>
            <button onClick={openResume} className={linkCls}>
              Resume
              {underline}
            </button>
          </li>
        </ul>

        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="lg:hidden grid place-items-center w-10 h-10 rounded-xl bg-gradient-to-r from-brand/20 to-purple-500/20 border border-white/30 transition-transform hover:scale-105"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span className="relative flex flex-col items-center justify-center gap-1.5">
            <span className={`w-5 h-0.5 bg-brand rounded-full transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-5 h-0.5 bg-brand rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-5 h-0.5 bg-brand rounded-full transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </span>
        </button>
      </nav>

      <div className={`lg:hidden overflow-hidden transition-all duration-500 ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <ul className="px-6 pb-6 space-y-1">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <a href={item.href} onClick={() => setMenuOpen(false)} className="block py-3 px-4 rounded-xl text-ink font-light hover:bg-brand/5 hover:text-brand transition-colors duration-300">
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <button onClick={openResume} className="block w-full text-left py-3 px-4 rounded-xl text-ink font-light hover:bg-brand/5 hover:text-brand transition-colors duration-300">
              Resume
            </button>
          </li>
        </ul>
      </div>

      {showResume && <DocViewer url={links.resume} title="Résumé" onClose={() => setShowResume(false)} />}
    </header>
  )
}
