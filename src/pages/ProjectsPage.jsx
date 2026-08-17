import { Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink, Star } from 'lucide-react'
import { useProfile } from '../lib/ProfileContext'
import { useSeason } from '../lib/useSeason'
import Footer from '../components/layout/Footer'
import { GithubIcon } from '../components/ui/BrandIcons'

function FullProjectCard({ project }) {
  return (
    <div className="group relative">
      <div className={`absolute -inset-0.5 rounded-3xl bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-30 blur transition-opacity duration-500 -z-10`} />
      <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg border border-white/60 transition-all duration-500 hover:-translate-y-1 hover:shadow-3xl h-full flex flex-col">
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-5 group-hover:opacity-15 transition-opacity duration-500`} />

        <div className="relative h-56 overflow-hidden">
          {project.image ? (
            <img src={project.image} alt={project.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${project.gradient}`} />
          )}
          <div className="absolute top-3 left-3 flex gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r ${project.gradient} text-white shadow-lg`}>{project.category}</span>
            {project.featured && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-400 text-amber-950 shadow-lg">
                <Star className="w-3 h-3 fill-amber-950" /> Featured
              </span>
            )}
          </div>
        </div>

        <div className="relative p-6 z-10 flex flex-col flex-1">
          <h3 className="text-xl md:text-2xl font-bold text-ink mb-2 group-hover:text-brand transition-colors">{project.title}</h3>
          <p className="text-gray-700 leading-relaxed text-sm md:text-base mb-4">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-5">
            {project.technologies.map((tech) => (
              <span key={tech} className="px-3 py-1.5 bg-gradient-to-r from-white to-gray-50 text-ink rounded-full text-xs font-semibold border border-gray-200">{tech}</span>
            ))}
          </div>

          <div className="flex gap-3 mt-auto">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-brand to-purple-600 text-white rounded-xl text-sm font-semibold hover:scale-105 transition-transform shadow">
                <ExternalLink className="w-4 h-4" /> Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-gray-800 to-black text-white rounded-xl text-sm font-semibold hover:scale-105 transition-transform shadow">
                <GithubIcon className="w-4 h-4" /> Code
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProjectsPage() {
  const { data } = useProfile()
  const { theme } = useSeason()
  const { projects } = data

  return (
    <div className="min-h-screen" style={{ background: theme.bg }}>
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-white/50">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-brand font-semibold hover:gap-3 transition-all">
            <ArrowLeft className="w-5 h-5" /> Back to portfolio
          </Link>
          <span className="font-medium text-ink hidden sm:block">{data.profile.name}</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-8 py-14">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-brand via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">All Projects</h1>
          <p className="text-lg text-ink/80 max-w-2xl mx-auto">Every project, in full detail — {projects.length} in total.</p>
          <div className="w-32 h-1.5 bg-gradient-to-r from-brand via-purple-500 to-pink-500 mx-auto rounded-full mt-6" />
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <FullProjectCard key={project.id} project={project} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
