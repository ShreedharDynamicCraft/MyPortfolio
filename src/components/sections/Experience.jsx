import { useState } from 'react'
import { ChevronDown, MapPin, FileText } from 'lucide-react'
import { useProfile } from '../../lib/ProfileContext'
import SectionHeader from '../ui/SectionHeader'
import Pill from '../ui/Pill'
import DocViewer from '../ui/DocViewer'

function typeBadge(type) {
  return type === 'Full-time'
    ? { label: 'Full-time', emoji: '💼' }
    : { label: 'Internship', emoji: '🎓' }
}

function CompanyLogo({ logo, company, gradient }) {
  const [err, setErr] = useState(!logo)
  if (err) {
    return (
      <span className={`w-full h-full grid place-items-center bg-gradient-to-br ${gradient} text-white font-extrabold`}>
        {company?.charAt(0) || '•'}
      </span>
    )
  }
  return <img src={logo} alt={company} className="w-full h-full object-contain bg-white p-1" onError={() => setErr(true)} />
}

function TimelineItem({ exp, open, onToggle, onViewLetter }) {
  const badge = typeBadge(exp.type)
  const LogoWrap = exp.companyUrl ? 'a' : 'span'
  const logoProps = exp.companyUrl
    ? { href: exp.companyUrl, target: '_blank', rel: 'noopener noreferrer', title: `${exp.company} on LinkedIn`, onClick: (e) => e.stopPropagation() }
    : {}

  return (
    <div className="relative pl-16 pb-6">
      <LogoWrap
        {...logoProps}
        className={`absolute left-[1px] top-3.5 w-9 h-9 rounded-full overflow-hidden ring-4 ring-indigo-50 shadow-md z-10 bg-white block ${exp.companyUrl ? 'hover:scale-110 transition-transform' : ''}`}
      >
        <CompanyLogo logo={exp.logo} company={exp.company} gradient={exp.gradient} />
      </LogoWrap>

      <div className={`bg-white/90 backdrop-blur-xl rounded-2xl border transition-all duration-300 ${open ? 'border-brand/30 shadow-card' : 'border-white/70 shadow-sm hover:shadow-md'}`}>
        <button type="button" onClick={onToggle} aria-expanded={open} className="w-full text-left p-5 md:p-6 flex items-start gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase bg-gradient-to-r ${exp.gradient} text-white shadow-sm`}>
                {badge.emoji} {badge.label}
              </span>
              <h3 className="text-lg md:text-xl font-extrabold text-ink">{exp.company}</h3>
            </div>
            <p className="text-brand font-semibold md:text-lg">{exp.position}</p>
            <div className="flex items-center gap-3 text-sm text-gray-500 mt-1.5 flex-wrap">
              <span className="font-semibold text-gray-600">{exp.duration}</span>
              {exp.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> {exp.location}
                </span>
              )}
            </div>
          </div>
          <ChevronDown className={`w-5 h-5 text-gray-400 shrink-0 mt-1 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
        </button>

        <div className={`grid transition-[grid-template-rows] duration-500 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
          <div className="overflow-hidden">
            <div className="px-5 md:px-6 pb-6">
              {exp.description && <p className="text-gray-700 leading-relaxed mb-4">{exp.description}</p>}
              {exp.highlights?.filter(Boolean).length > 0 && (
                <ul className="space-y-2 mb-5">
                  {exp.highlights.filter(Boolean).map((h, i) => (
                    <li key={i} className="flex gap-2.5 text-gray-700 leading-relaxed text-sm md:text-base">
                      <span className={`mt-2 shrink-0 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${exp.gradient}`} />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex flex-wrap gap-2">
                {exp.skills.map((skill) => (
                  <Pill key={skill}>{skill}</Pill>
                ))}
              </div>
              {(exp.letter || exp.driveLink) &&
                (exp.letter ? (
                  <button
                    onClick={() => onViewLetter(exp.letter, `${exp.company} — Experience Letter`)}
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 text-brand text-sm font-semibold hover:bg-brand/20 transition"
                  >
                    <FileText className="w-4 h-4" /> Experience letter
                  </button>
                ) : (
                  <a
                    href={exp.driveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 text-brand text-sm font-semibold hover:bg-brand/20 transition"
                  >
                    <FileText className="w-4 h-4" /> Experience letter
                  </a>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Experience() {
  const { data } = useProfile()
  const { experiences, education } = data

  const [openIds, setOpenIds] = useState(() => new Set(experiences.length ? [experiences[0].id] : []))
  const [doc, setDoc] = useState(null)
  const allOpen = experiences.length > 0 && openIds.size === experiences.length

  const toggle = (id) =>
    setOpenIds((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  const setAll = (open) => setOpenIds(open ? new Set(experiences.map((e) => e.id)) : new Set())

  return (
    <section id="experience" className="relative bg-indigo-50 py-20 px-4 md:px-8 overflow-hidden">
      <SectionHeader title="Work Experience" subtitle="My journey through the world of software development" />

      <div className="relative max-w-4xl mx-auto">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setAll(!allOpen)}
            className="text-sm font-semibold text-brand hover:text-brand-dark transition-colors px-3 py-1.5 rounded-lg hover:bg-white/60"
          >
            {allOpen ? 'Collapse all' : 'Expand all'}
          </button>
        </div>

        <div className="relative">
          <div className="absolute left-[18px] top-3 bottom-6 w-0.5 bg-gradient-to-b from-brand via-purple-400 to-pink-400 rounded-full" />
          {experiences.map((exp) => (
            <TimelineItem
              key={exp.id}
              exp={exp}
              open={openIds.has(exp.id)}
              onToggle={() => toggle(exp.id)}
              onViewLetter={(url, title) => setDoc({ url, title })}
            />
          ))}
        </div>
      </div>

      <div className="relative text-center mt-20 z-10">
        <h3 className="text-3xl md:text-4xl font-extrabold text-brand mb-10">Education</h3>
        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {education.map((edu) => (
            <div key={edu.id} className="bg-white/90 rounded-2xl shadow-xl p-6 flex flex-col items-center border border-white/60">
              {edu.logo && (
                <img
                  src={edu.logo}
                  alt=""
                  className="w-16 h-16 mb-4 rounded-full shadow-lg object-contain bg-white"
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                />
              )}
              <h4 className="text-lg font-bold text-ink mb-2">{edu.institution}</h4>
              <span className="text-brand font-semibold mb-1">{edu.degree}</span>
              <span className="text-gray-600">{edu.period}</span>
              {edu.photos?.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-2 w-full">
                  {edu.photos.map((src, i) => (
                    <button
                      key={i}
                      onClick={() => setDoc({ url: src, title: `${edu.institution} — Convocation` })}
                      className="relative rounded-lg overflow-hidden border border-gray-200 group"
                    >
                      <img src={src} alt="Convocation" loading="lazy" className="w-full h-24 object-cover group-hover:scale-105 transition-transform duration-500" />
                      <span className="absolute inset-0 grid place-items-center bg-black/0 group-hover:bg-black/35 text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition">
                        🎓 View
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {doc && <DocViewer url={doc.url} title={doc.title} onClose={() => setDoc(null)} />}
    </section>
  )
}
