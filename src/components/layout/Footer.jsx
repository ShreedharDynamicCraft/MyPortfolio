import { useEffect, useState } from 'react'
import { Code, Rocket, ArrowUp, Heart, Coffee } from 'lucide-react'
import { useProfile } from '../../lib/ProfileContext'
import { getIcon } from '../../lib/iconRegistry'

const QUICK_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Achievements', href: '#achievements' },
  { name: 'Contact', href: '#contact' },
]

export default function Footer() {
  const { data } = useProfile()
  const { name, about, availableForWork } = data.profile
  const socials = data.socials
  const skills = data.techStacks.slice(0, 10).map((t) => t.name)

  const [showTop, setShowTop] = useState(false)
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <footer className="relative bg-gradient-to-br from-slate-100 via-indigo-100 to-purple-50 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Stay Connected
          </h2>
          <div className="w-40 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-14">
          <div className="lg:col-span-3">
            <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-xl border border-white/80 h-full">
              <h3 className="text-2xl md:text-3xl font-black text-ink mb-4 flex items-center">
                <Code className="w-6 h-6 mr-3 text-brand" /> About Me
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">{about}</p>
              <div className="flex flex-wrap gap-2.5 mb-6">
                {skills.map((skill) => (
                  <span key={skill} className="px-3.5 py-1.5 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 rounded-2xl text-sm font-bold border border-gray-200">
                    {skill}
                  </span>
                ))}
              </div>
              {availableForWork && (
                <div className="flex items-center gap-2 text-green-600">
                  <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium">Available for new projects</span>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/80 h-full">
              <h3 className="text-2xl font-black text-ink mb-6 flex items-center">
                <Rocket className="w-6 h-6 mr-3 text-purple-500" /> Quick Links
              </h3>
              <nav className="space-y-3">
                {QUICK_LINKS.map((link) => (
                  <a key={link.name} href={link.href} className="group flex items-center text-gray-600 hover:text-brand hover:translate-x-1.5 transition-all duration-300 font-medium">
                    <ArrowUp className="w-4 h-4 mr-2 rotate-45 text-gray-400 group-hover:rotate-90 transition-transform" />
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl md:text-3xl font-black text-ink mb-8 text-center">Connect With Me</h3>
          <div className="flex justify-center gap-5 flex-wrap">
            {socials.map((social) => {
              const Icon = getIcon(social.icon)
              return (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  title={`${social.name} — ${social.description}`}
                  className="group relative grid place-items-center w-14 h-14 bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200 hover:border-brand/40 transition-all duration-500 hover:scale-110 hover:-translate-y-1.5 shadow-lg"
                >
                  <span className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-15 rounded-2xl transition-opacity duration-500`} />
                  <Icon className="w-6 h-6 text-gray-600 group-hover:text-ink transition-colors" />
                </a>
              )
            })}
          </div>
        </div>

        <div className="border-t border-white/40 pt-8 flex items-center justify-center gap-2 text-black/60 text-sm">
          <span>© {new Date().getFullYear()} Made with</span>
          <Heart className="w-4 h-4 text-red-500 animate-pulse" />
          <span>by {name.split(' ')[0]}</span>
          <Coffee className="w-4 h-4 text-yellow-600" />
        </div>
      </div>

      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-full shadow-2xl hover:scale-110 transition-transform z-50 grid place-items-center"
          aria-label="Back to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </footer>
  )
}
