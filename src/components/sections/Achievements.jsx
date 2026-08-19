import { useEffect, useState } from 'react'
import { Calendar, ExternalLink, X } from 'lucide-react'
import { useProfile } from '../../lib/ProfileContext'
import { getIcon } from '../../lib/iconRegistry'
import SectionHeader from '../ui/SectionHeader'

function AchievementCard({ item, onOpen }) {
  const Icon = getIcon(item.icon)
  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className="group relative text-left cursor-pointer w-full"
    >
      <div className="relative bg-white/95 backdrop-blur-2xl rounded-3xl overflow-hidden shadow-card border border-white/80 transition-all duration-500 hover:scale-[1.03] hover:shadow-3xl">
        <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-[0.07] group-hover:opacity-15 transition-opacity duration-500`} />

        <div className="relative">
          <div className="relative h-56 overflow-hidden">
            <img src={item.image} alt={item.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute top-4 right-4">
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r ${item.color} text-white shadow-lg`}>
                {item.category}
              </span>
            </div>
            <div className={`absolute top-4 left-4 w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} grid place-items-center shadow-lg group-hover:scale-110 transition-transform`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${item.color} text-white shadow-lg`}>
                {item.achievement}
              </span>
              <span className="flex items-center text-white text-sm">
                <Calendar className="w-4 h-4 mr-1" />
                {item.date}
              </span>
            </div>
          </div>

          <div className="relative p-6 md:p-7 z-10">
            <h3 className="text-xl md:text-2xl font-bold text-ink mb-1 group-hover:text-brand transition-colors">{item.title}</h3>
            <p className="text-gray-600 mb-3 text-sm">{item.issuer}</p>
            <p className="text-gray-700 mb-4 leading-relaxed text-sm line-clamp-2">{item.description}</p>
            <div className="flex flex-wrap gap-2">
              {item.skills.slice(0, 4).map((skill) => (
                <span key={skill} className="px-3 py-1 bg-gradient-to-r from-white to-gray-50 text-ink rounded-full text-xs font-semibold border border-gray-200">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </button>
  )
}

function AchievementModal({ item, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const Icon = getIcon(item.icon)
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-fadeIn" onClick={onClose}>
      <div className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scaleIn" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-5 right-5 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 grid place-items-center transition-colors z-10" aria-label="Close">
          <X className="w-5 h-5 text-gray-600" />
        </button>
        <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8">
          <div className="rounded-2xl overflow-hidden shadow-lg bg-gray-50 grid place-items-center">
            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
          </div>
          <div className="space-y-5">
            <div className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r ${item.color} text-white text-sm font-bold`}>
              <Icon className="w-4 h-4 mr-2" />
              {item.achievement}
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-ink mb-1">{item.title}</h2>
              <p className="text-gray-600">{item.issuer} • {item.date}</p>
            </div>
            <p className="text-gray-700 leading-relaxed">{item.description}</p>
            <div>
              <h3 className="text-ink font-semibold mb-2">Skills &amp; Highlights</h3>
              <div className="flex flex-wrap gap-2">
                {item.skills.map((skill) => (
                  <span key={skill} className={`px-3 py-1.5 bg-gradient-to-r ${item.color} text-white rounded-full text-xs font-medium shadow`}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            {item.link && (
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-brand font-semibold hover:underline">
                View credential <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Achievements() {
  const { data } = useProfile()
  const [selected, setSelected] = useState(null)

  return (
    <section id="achievements" className="relative bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-20 px-4 md:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10" aria-hidden="true" />
      <SectionHeader title="Achievements" subtitle="Milestones and recognition that shaped my journey" variant="gradient" />

      <div className="relative max-w-6xl mx-auto">
        <div className="grid gap-8 lg:grid-cols-2">
          {data.achievements.map((item) => (
            <AchievementCard key={item.id} item={item} onOpen={setSelected} />
          ))}
        </div>
      </div>

      {selected && <AchievementModal item={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}
