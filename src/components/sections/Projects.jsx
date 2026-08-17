import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown, Star } from 'lucide-react'
import { useProfile } from '../../lib/ProfileContext'
import SectionHeader from '../ui/SectionHeader'
import FloatingShapes from '../ui/FloatingShapes'
import SlideButton from '../ui/SlideButton'

function ProjectCard({ project }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="group relative">
      <div className={`absolute -inset-0.5 rounded-3xl bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-30 blur transition-opacity duration-500 -z-10`} />

      <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg border border-white/60 transition-all duration-500 hover:-translate-y-1 hover:shadow-3xl">
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-5 group-hover:opacity-15 transition-opacity duration-500`} />

        <div className="relative h-52 overflow-hidden">
          {project.image ? (
            <img src={project.image} alt={project.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${project.gradient}`} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-3">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-gradient-to-r from-brand to-purple-600 text-white rounded-xl text-sm font-semibold hover:scale-105 transition-transform shadow-lg">🚀 Live</a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-gradient-to-r from-gray-800 to-black text-white rounded-xl text-sm font-semibold hover:scale-105 transition-transform shadow-lg">🔗 Code</a>
            )}
          </div>
          <div className="absolute top-3 left-3 flex gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r ${project.gradient} text-white shadow-lg`}>{project.category}</span>
            {project.featured && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-400 text-amber-950 shadow-lg">
                <Star className="w-3 h-3 fill-amber-950" /> Featured
              </span>
            )}
          </div>
        </div>

        <div className="relative p-6 z-10">
          <h3 className="text-xl md:text-2xl font-bold text-ink mb-2 group-hover:text-brand transition-colors duration-300">{project.title}</h3>
          <p className={`text-gray-700 leading-relaxed text-sm md:text-base ${open ? '' : 'line-clamp-2'}`}>{project.description}</p>

          <div className={`grid transition-[grid-template-rows] duration-500 ease-out ${open ? 'grid-rows-[1fr] mt-4' : 'grid-rows-[0fr]'}`}>
            <div className="overflow-hidden">
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="px-3 py-1.5 bg-gradient-to-r from-white to-gray-50 text-ink rounded-full text-xs font-semibold border border-gray-200 hover:border-brand hover:-translate-y-0.5 transition-all duration-300 shadow-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <button onClick={() => setOpen((v) => !v)} className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:text-brand-dark transition-colors" aria-expanded={open}>
              {open ? 'Show less' : 'Details'}
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
            </button>
            <div className="flex gap-2 md:hidden">
              {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-gradient-to-r from-brand to-purple-600 text-white rounded-lg text-xs font-semibold">Live</a>}
              {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-gradient-to-r from-gray-800 to-black text-white rounded-lg text-xs font-semibold">Code</a>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function chunk(arr, n) {
  const out = []
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n))
  return out
}

function ProjectPair({ pair }) {
  return (
    <div className="relative flex flex-col md:flex-row gap-10 md:gap-16 md:items-start">
      <span className="absolute left-1/2 -translate-x-1/2 top-6 grid place-items-center w-6 h-6 rounded-full bg-gradient-to-br from-brand to-pink-500 ring-4 ring-blue-50 shadow-md z-20 hidden md:grid">
        <span className="w-1.5 h-1.5 rounded-full bg-white/90" />
      </span>
      <div className="md:w-1/2">
        <ProjectCard project={pair[0]} />
      </div>
      {pair[1] ? (
        <div className="md:w-1/2">
          <ProjectCard project={pair[1]} />
        </div>
      ) : (
        <div className="hidden md:block md:w-1/2" />
      )}
    </div>
  )
}

export default function Projects() {
  const { data } = useProfile()
  const { projects } = data
  const navigate = useNavigate()
  const rows = chunk(projects, 2)

  return (
    <section id="projects" className="relative bg-blue-50 py-20 px-4 md:px-8 overflow-hidden">
      <FloatingShapes />
      <SectionHeader title="My Projects" subtitle="A thread of things I've built — hit Details to dig in" />

      <div className="relative max-w-6xl mx-auto">
        <div className="absolute left-1/2 -translate-x-1/2 top-2 bottom-2 w-0.5 bg-gradient-to-b from-brand via-purple-400 to-pink-400 rounded-full hidden md:block" />
        <div className="space-y-10 md:space-y-16">
          {rows.map((pair, r) => (
            <ProjectPair key={r} pair={pair} />
          ))}
        </div>
      </div>

      <div className="relative text-center mt-14 z-10">
        <SlideButton onClick={() => navigate('/projects')}>View All Projects</SlideButton>
      </div>
    </section>
  )
}
