import { useEffect, useMemo, useRef, useState } from 'react'
import { X, Volume2, VolumeX, ChevronLeft, ChevronRight, Mail, MapPin, FileText } from 'lucide-react'
import { useProfile } from '../../lib/ProfileContext'
import { getIcon } from '../../lib/iconRegistry'
import { istParts, getGreeting } from '../../lib/greeting'
import DocViewer from '../ui/DocViewer'

let audioCtx = null
function playFlipSound() {
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)()
    const ctx = audioCtx
    if (ctx.state === 'suspended') ctx.resume()
    const now = ctx.currentTime
    const dur = 0.42
    const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * dur), ctx.sampleRate)
    const d = buffer.getChannelData(0)
    for (let i = 0; i < d.length; i++) {
      const t = i / d.length
      const lift = Math.min(1, t * 6)
      const fall = Math.pow(1 - t, 1.7)
      const env = lift * fall * (0.6 + 0.4 * Math.sin(t * 48))
      d[i] = (Math.random() * 2 - 1) * env
    }
    const src = ctx.createBufferSource()
    src.buffer = buffer
    const filter = ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.Q.value = 0.85
    filter.frequency.setValueAtTime(2800, now)
    filter.frequency.exponentialRampToValueAtTime(480, now + dur)
    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.001, now)
    gain.gain.exponentialRampToValueAtTime(0.4, now + 0.05)
    gain.gain.exponentialRampToValueAtTime(0.01, now + dur)
    src.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)
    src.start(now)
    src.stop(now + dur)
  } catch {
  }
}

const MONTHS = {
  1: { emojis: ['🪁', '🎉', '🎆'], query: 'makar sankranti kite festival india' },
  2: { emojis: ['🌼', '🎶', '🕉️'], query: 'vasant panchami india spring temple' },
  3: { emojis: ['🎨', '🌸', '🎨'], query: 'holi festival colours india' },
  4: { emojis: ['🌾', '🏹', '🎊'], query: 'baisakhi ram navami india' },
  5: { emojis: ['☸️', '🌺', '🪷'], query: 'buddha purnima india temple lotus' },
  6: { emojis: ['🛕', '🪷', '📿'], query: 'india ancient temple architecture heritage' },
  7: { emojis: ['☔', '🕉️', '📿'], query: 'guru purnima india monsoon temple' },
  8: { emojis: ['🇮🇳', '🪢', '🇮🇳', '🪢'], query: 'india independence day tricolour flag' },
  9: { emojis: ['🦚', '🐘', '🪈'], query: 'ganesh chaturthi janmashtami india' },
  10: { emojis: ['🪔', '🏹', '🌼'], query: 'navratri durga puja dussehra india' },
  11: { emojis: ['🪔', '✨', '🪔'], query: 'diwali diya oil lamps india' },
  12: { emojis: ['🎄', '❄️', '🎄'], query: 'christmas lights celebration' },
}
const DEFAULT_MONTH = { emojis: ['📖', '✒️', '📚', '🕯️'], query: 'india ancient art heritage classical' }
const imgCache = {}
const DECOR_POS = [
  { top: '10%', left: '7%' },
  { top: '16%', right: '8%' },
  { bottom: '14%', left: '10%' },
  { bottom: '20%', right: '7%' },
]
const FLIP_MS = 700

function chunk(a, n) {
  const out = []
  for (let i = 0; i < a.length; i += n) out.push(a.slice(i, i + n))
  return out
}

const Skills = ({ list }) =>
  list.map((s) => (
    <span key={s} className="inline-block px-2 py-0.5 m-0.5 rounded bg-amber-100 text-amber-900 text-xs">
      {s}
    </span>
  ))

function Leaf({ idx, children }) {
  return (
    <div className="h-full flex flex-col p-6">
      <div className="flex-1 min-h-0 overflow-hidden">{children}</div>
      <div className="book-pagenum text-[11px] text-stone-400 text-center pt-2">— {idx + 1} —</div>
    </div>
  )
}

export default function BookMode({ onClose }) {
  const { data } = useProfile()
  const { profile, experiences, education, projects, techStacks, achievements, socials } = data
  const [spread, setSpread] = useState(0)
  const [flipping, setFlipping] = useState(null)
  const [muted, setMuted] = useState(false)
  const [showResume, setShowResume] = useState(false)
  const timer = useRef(null)

  const categories = useMemo(() => [...new Set(techStacks.map((t) => t.category))], [techStacks])
  const month = useMemo(() => {
    try {
      return istParts(new Date()).mo
    } catch {
      return 0
    }
  }, [])
  const monthData = MONTHS[month] || DEFAULT_MONTH
  const decor = monthData.emojis
  const [bgImg, setBgImg] = useState(() => imgCache[monthData.query] || null)

  useEffect(() => {
    if (imgCache[monthData.query]) {
      setBgImg(imgCache[monthData.query])
      return
    }
    let alive = true
    fetch(`https://api.openverse.org/v1/images/?q=${encodeURIComponent(monthData.query)}&page_size=12&mature=false`)
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        const results = j?.results?.filter((x) => x.url && x.url.startsWith('https'))
        if (results?.length) {
          const url = results[Math.min(2, results.length - 1)].url
          imgCache[monthData.query] = url
          if (alive) setBgImg(url)
        }
      })
      .catch(() => {})
    return () => {
      alive = false
    }
  }, [monthData.query])

  const greeting = useMemo(() => {
    try {
      return getGreeting(new Date())
    } catch {
      return null
    }
  }, [])
  const portfolio = profile.links.portfolio || (typeof window !== 'undefined' ? window.location.origin : '')
  const referBody = `Hi,\n\nI'd like to refer ${profile.name}${profile.headline ? ` — ${profile.headline}` : ''}.\n\nPortfolio: ${portfolio}\nRésumé: ${profile.links.resume}\nLinkedIn: ${profile.links.linkedin}\n\nThank you!`
  const referHref = `mailto:?subject=${encodeURIComponent(`Referral: ${profile.name}`)}&body=${encodeURIComponent(referBody)}`

  const pages = useMemo(() => {
    const p = [{ type: 'cover' }, { type: 'about' }]
    if (education?.length) p.push({ type: 'education' })
    experiences.forEach((e) => p.push({ type: 'exp', e }))
    chunk(projects, 2).forEach((pr) => p.push({ type: 'proj', pr }))
    chunk(categories, 5).forEach((cs) => p.push({ type: 'skills', cs }))
    p.push({ type: 'ach' })
    p.push({ type: 'resume' })
    p.push({ type: 'back' })
    p.push({ type: 'end' })
    if (p.length % 2 !== 0) p.splice(p.length - 2, 0, { type: 'divider' })
    return p
  }, [experiences, education, projects, categories, achievements])

  const leaves = Math.ceil(pages.length / 2)

  const turn = (dir) => {
    const target = dir === 'next' ? spread + 1 : spread - 1
    if (target < 0 || target > leaves) return
    if (!muted) playFlipSound()
    setFlipping(dir === 'next' ? spread : target)
    setSpread(target)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setFlipping(null), FLIP_MS)
  }

  const turnRef = useRef(turn)
  turnRef.current = turn
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') turnRef.current('next')
      else if (e.key === 'ArrowLeft') turnRef.current('prev')
      else if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const dragX = useRef(null)
  const onPointerDown = (e) => {
    if (e.target.closest('button, a')) {
      dragX.current = null
      return
    }
    dragX.current = e.clientX
  }
  const onPointerUp = (e) => {
    if (dragX.current == null) return
    const dx = e.clientX - dragX.current
    dragX.current = null
    if (dx < -45) turn('next')
    else if (dx > 45) turn('prev')
  }

  const renderContent = (pg, idx) => {
    if (!pg) return <div className="book-page h-full" />
    if (pg.type === 'divider') {
      return (
        <div className="book-cover h-full grid place-items-center p-8 text-center">
          <div>
            <span className="text-4xl text-amber-200/70">❦</span>
            <p className="book-serif italic text-amber-100/80 text-lg mt-5">Code with impact.<br />Build with heart.</p>
          </div>
        </div>
      )
    }
    if (pg.type === 'end') {
      return (
        <div className="book-cover h-full flex flex-col items-center justify-center text-center gap-3 p-8">
          <p className="book-serif text-amber-200/70 tracking-[0.4em] text-xs uppercase">The End</p>
          <p className="book-serif text-2xl text-amber-100 italic">Thank you for reading.</p>
          <div className="w-14 h-px bg-amber-200/40 my-1" />
          <p className="text-amber-100/75 text-sm">Let's build something great together.</p>
          <p className="book-signature text-amber-100/90 text-3xl mt-2 -rotate-3">{profile.name}</p>
          <span className="text-3xl mt-1 text-amber-200/70">✦</span>
        </div>
      )
    }
    switch (pg.type) {
      case 'cover':
        return (
          <div className="book-cover h-full flex flex-col items-center justify-center text-center gap-3 p-7">
            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-amber-200/60 shadow-xl">
              <img src={profile.heroImage} alt={profile.name} className="w-full h-full object-cover" />
            </div>
            <h1 className="book-serif text-2xl font-bold text-amber-100">{profile.name}</h1>
            <p className="text-amber-200/80 text-[11px] tracking-widest uppercase">{profile.headline}</p>
            <div className="w-14 h-px bg-amber-200/40 my-1" />
            <p className="book-serif text-amber-200/70 tracking-[0.3em] text-[11px] uppercase">Portfolio</p>
          </div>
        )
      case 'about':
        return (
          <Leaf idx={idx}>
            <h2 className="book-heading">About Me</h2>
            <img src={profile.heroImage} alt="" className="w-20 h-20 object-cover rounded-xl float-right ml-3 mb-2 shadow-md" />
            <p className="book-body text-sm">{profile.about}</p>
            <div className="mt-3 space-y-1 text-xs text-stone-600 clear-both">
              {profile.location && <p className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {profile.location}</p>}
              {profile.email && <p>✉️ {profile.email}</p>}
            </div>
          </Leaf>
        )
      case 'education': {
        const gradPhotos = education.find((e) => e.photos?.length)?.photos || []
        return (
          <Leaf idx={idx}>
            <h2 className="book-heading">Education</h2>
            <div className="space-y-2">
              {education.map((ed) => (
                <div key={ed.id} className="border-l-2 border-amber-300 pl-3">
                  <p className="font-bold text-stone-800 text-sm">{ed.institution}</p>
                  <p className="text-xs text-amber-800">{ed.degree}</p>
                  <p className="text-[11px] text-stone-500">{ed.period}</p>
                </div>
              ))}
            </div>
            {gradPhotos.length > 0 && (
              <div className="mt-3">
                <div className="grid grid-cols-2 gap-1.5">
                  {gradPhotos.map((src, i) => (
                    <img key={i} src={src} alt="Convocation" className="w-full h-24 object-cover rounded-md border border-amber-200 shadow" loading="lazy" />
                  ))}
                </div>
                <p className="text-[10px] text-center text-stone-500 mt-1">🎓 IIITM Manipur — Convocation</p>
              </div>
            )}
          </Leaf>
        )
      }
      case 'exp': {
        const e = pg.e
        return (
          <Leaf idx={idx}>
            <h2 className="book-heading">Experience</h2>
            <p className="font-bold text-stone-800">{e.company}</p>
            <p className="text-sm text-amber-800">{e.position}</p>
            <p className="text-xs text-stone-500 mb-2">{e.duration} · {e.location}</p>
            {e.description && <p className="book-body text-sm mb-2">{e.description}</p>}
            <ul className="space-y-1.5 mb-2">
              {(e.highlights || []).map((h, i) => (
                <li key={i} className="text-xs text-stone-600 leading-snug flex gap-1.5">
                  <span className="text-amber-600 mt-0.5">◆</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
            <div><Skills list={e.skills} /></div>
          </Leaf>
        )
      }
      case 'proj':
        return (
          <Leaf idx={idx}>
            <h2 className="book-heading">Projects</h2>
            <div className="space-y-4">
              {pg.pr.map((pr) => (
                <div key={pr.id}>
                  <p className="font-bold text-stone-800 text-sm">{pr.title}</p>
                  <p className="text-xs text-amber-800 mb-1">{pr.category}</p>
                  <p className="book-body text-xs leading-snug mb-1">{pr.description}</p>
                  <div><Skills list={pr.technologies} /></div>
                </div>
              ))}
            </div>
          </Leaf>
        )
      case 'skills':
        return (
          <Leaf idx={idx}>
            <h2 className="book-heading">Tech Stack</h2>
            <div className="space-y-2.5">
              {pg.cs.map((cat) => (
                <div key={cat}>
                  <p className="font-semibold text-amber-800 text-sm">{cat}</p>
                  <p className="text-xs text-stone-600">{techStacks.filter((t) => t.category === cat).map((t) => t.name).join(' · ')}</p>
                </div>
              ))}
            </div>
          </Leaf>
        )
      case 'ach':
        return (
          <Leaf idx={idx}>
            <h2 className="book-heading">Achievements</h2>
            <div className="space-y-3">
              {achievements.map((a) => {
                const Icon = getIcon(a.icon)
                return (
                  <div key={a.id} className="flex gap-2.5">
                    <Icon className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-stone-800 text-sm">{a.title}</p>
                      <p className="text-xs text-stone-500">{a.issuer} · {a.date}</p>
                      <p className="book-body text-xs leading-snug">{a.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </Leaf>
        )
      case 'resume':
        return (
          <div className="h-full flex flex-col p-5">
            <h2 className="book-heading text-center">My Résumé</h2>
            <button onClick={() => setShowResume(true)} className="relative flex-1 min-h-0 rounded-lg overflow-hidden border border-amber-200 shadow group">
              <img src="/resume-preview.jpg" alt="Résumé preview" className="w-full h-full object-cover object-top" loading="lazy" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 flex items-center justify-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500 text-white text-xs font-semibold shadow group-hover:scale-105 transition-transform">
                  <FileText className="w-3.5 h-3.5" /> Tap to open full résumé
                </span>
              </div>
            </button>
            <div className="book-pagenum text-[11px] text-stone-400 text-center pt-2">— {idx + 1} —</div>
          </div>
        )
      case 'back':
        return (
          <div className="book-cover h-full flex flex-col items-center justify-center text-center gap-2.5 p-7">
            <h2 className="book-serif text-2xl font-bold text-amber-100">Let's connect</h2>
            <div className="w-14 h-px bg-amber-200/40 my-1" />
            <div className="space-y-1 text-amber-100/90 text-sm">
              {socials.map((s) => (
                <p key={s.id}>{s.name}</p>
              ))}
            </div>
            <a href={referHref} className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-200/90 text-amber-950 text-sm font-semibold hover:bg-amber-100 transition">
              <Mail className="w-4 h-4" /> Refer me by email
            </a>
            <p className="book-signature text-amber-100/90 text-3xl mt-2 -rotate-3">{profile.name}</p>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 z-[80] flex flex-col items-center justify-center p-4 overflow-hidden" style={{ background: '#150e08' }}>
      {bgImg && (
        <img
          src={bgImg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-25 transition-opacity duration-1000 pointer-events-none"
          style={{ filter: 'blur(2px)' }}
          onError={(e) => e.currentTarget.remove()}
        />
      )}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 35%, rgba(74,49,32,0.68) 0%, rgba(43,28,18,0.85) 45%, rgba(21,14,8,0.96) 100%)' }} />
      {decor.map((e, i) => (
        <span key={i} className="absolute text-8xl md:text-9xl opacity-[0.14] select-none pointer-events-none" style={DECOR_POS[i % DECOR_POS.length]}>
          {e}
        </span>
      ))}

      <div className="absolute top-4 right-4 flex gap-2 z-10">
        <button onClick={() => setMuted((m) => !m)} className="w-10 h-10 grid place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 transition" aria-label={muted ? 'Unmute' : 'Mute'}>
          {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
        <button onClick={onClose} className="w-10 h-10 grid place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 transition" aria-label="Close book">
          <X className="w-5 h-5" />
        </button>
      </div>

      {greeting && (
        <div className="mb-1.5 book-serif text-lg md:text-2xl flex items-center gap-2">
          <span className="text-2xl md:text-3xl">{greeting.emoji}</span>
          <span className="bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 bg-clip-text text-transparent font-bold">{greeting.text}</span>
        </div>
      )}
      <p className="book-serif text-amber-100/50 text-sm mb-4 hidden sm:block italic">A journey through my work — turn the page</p>

      <div style={{ perspective: '2600px', width: 'min(94vw, 780px)', height: 'min(74vh, 560px)', transform: `translateX(${spread === 0 ? '-25%' : spread === leaves ? '25%' : '0%'})`, transition: `transform ${FLIP_MS}ms cubic-bezier(0.4, 0.05, 0.2, 1)` }}>
        <div
          className="relative w-full h-full cursor-grab active:cursor-grabbing"
          style={{ transformStyle: 'preserve-3d', touchAction: 'pan-y' }}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        >
          {Array.from({ length: leaves }).map((_, i) => {
            const turned = i < spread
            const isFlipping = i === flipping
            const z = isFlipping ? 999 : turned ? i : leaves - i
            return (
              <div
                key={i}
                className="absolute top-0"
                style={{
                  left: '50%',
                  width: '50%',
                  height: '100%',
                  transformStyle: 'preserve-3d',
                  transformOrigin: 'left center',
                  transform: `rotateY(${turned ? -180 : 0}deg)`,
                  transition: `transform ${FLIP_MS}ms cubic-bezier(0.4, 0.05, 0.2, 1)`,
                  zIndex: z,
                }}
              >
                <div className="book-leaf book-page" style={{ backfaceVisibility: 'hidden' }}>
                  {renderContent(pages[2 * i], 2 * i)}
                  <span className="book-curl" />
                </div>
                <div className="book-leaf book-page" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                  {renderContent(pages[2 * i + 1], 2 * i + 1)}
                  <span className="book-curl book-curl-left" />
                </div>
              </div>
            )
          })}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-6 pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.28), transparent)', zIndex: 1000 }} />
          <div className="book-thread absolute top-6 bottom-6 left-1/2 -translate-x-1/2 pointer-events-none" style={{ zIndex: 1001 }} />
        </div>
      </div>

      <div className="flex items-center gap-4 mt-5">
        <button onClick={() => turn('prev')} className={`inline-flex items-center gap-1 px-5 py-2.5 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 transition ${spread === 0 ? 'invisible' : ''}`}>
          <ChevronLeft className="w-4 h-4" /> Prev
        </button>
        <span className="book-pagenum text-amber-100/70 text-sm tabular-nums w-16 text-center">{spread} / {leaves}</span>
        <button onClick={() => turn('next')} className={`inline-flex items-center gap-1 px-5 py-2.5 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 transition ${spread === leaves ? 'invisible' : ''}`}>
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {showResume && <DocViewer url={profile.links.resume} title="Résumé" onClose={() => setShowResume(false)} />}
    </div>
  )
}
