import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { X, Volume2, VolumeX, ChevronLeft, ChevronRight, Mail, MapPin, FileText, RotateCcw, Download } from 'lucide-react'
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
const FLIP_EASE = 'cubic-bezier(0.4, 0.05, 0.2, 1)'
const BLOCK_GAP = 10

const CORNER = `data:image/svg+xml,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'><g fill='none' stroke='#3fb950' stroke-width='2.4'><path d='M6 66 C6 24 24 6 66 6'/><path d='M16 66 C16 30 30 16 66 16'/></g><g fill='#3fb950'><circle cx='14' cy='14' r='3.4'/><path d='M66 4 l3.2 6.4 -3.2 6.4 -3.2 -6.4 z'/><path d='M4 66 l6.4 3.2 6.4 -3.2 -6.4 -3.2 z'/></g></svg>"
)}`

function CoverCorners() {
  const base = {
    position: 'absolute',
    width: 52,
    height: 52,
    backgroundImage: `url("${CORNER}")`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    opacity: 0.9,
    pointerEvents: 'none',
    zIndex: 3,
  }
  return (
    <>
      <span style={{ ...base, top: 12, left: 12 }} />
      <span style={{ ...base, top: 12, right: 12, transform: 'scaleX(-1)' }} />
      <span style={{ ...base, bottom: 12, left: 12, transform: 'scaleY(-1)' }} />
      <span style={{ ...base, bottom: 12, right: 12, transform: 'scale(-1,-1)' }} />
    </>
  )
}

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
    <div className="h-full flex flex-col p-5 sm:p-6">
      <div className="flex-1 min-h-0 overflow-hidden">{children}</div>
      <div className="book-pagenum text-[11px] text-stone-400 text-center pt-2">— {idx + 1} —</div>
    </div>
  )
}

const ROPE_SEGMENTS = 18

function BindingThread({ zIndex }) {
  const boxRef = useRef(null)
  const pathRef = useRef(null)
  const path2Ref = useRef(null)
  const beadRef = useRef(null)
  const st = useRef({ pts: null, dragging: false, pin: null, H: 0, W: 44, seg: 0 })

  useEffect(() => {
    let raf
    const N = ROPE_SEGMENTS
    const grav = 0.6
    const damp = 0.92
    const iters = 20

    const init = (w, h) => {
      const ax = w / 2
      const seg = (h - 8) / N
      const pts = []
      for (let i = 0; i <= N; i++) {
        const y = 3 + seg * i
        pts.push({ x: ax, y, px: ax, py: y })
      }
      st.current.pts = pts
      st.current.seg = seg
      st.current.H = h
      st.current.W = w
      st.current.pin = { x: ax, y: 3 + seg * N }
    }

    const tick = () => {
      const box = boxRef.current
      if (box) {
        const w = box.clientWidth || 44
        const h = box.clientHeight || 400
        const s = st.current
        if (!s.pts || Math.abs(h - s.H) > 2 || Math.abs(w - s.W) > 2) init(w, h)
        const pts = s.pts
        const ax = w / 2
        const pinned = s.dragging && s.pin

        for (let i = 1; i <= N; i++) {
          const p = pts[i]
          const vx = (p.x - p.px) * damp
          const vy = (p.y - p.py) * damp
          p.px = p.x
          p.py = p.y
          p.x += vx
          p.y += vy + grav
        }

        for (let k = 0; k < iters; k++) {
          pts[0].x = ax
          pts[0].y = 3
          if (pinned) {
            pts[N].x = s.pin.x
            pts[N].y = s.pin.y
          }
          for (let i = 0; i < N; i++) {
            const a = pts[i]
            const b = pts[i + 1]
            const dx = b.x - a.x
            const dy = b.y - a.y
            const d = Math.hypot(dx, dy) || 0.0001
            const diff = (d - s.seg) / d
            const aPinned = i === 0
            const bPinned = i + 1 === N && pinned
            if (aPinned && bPinned) continue
            if (aPinned) {
              b.x -= dx * diff
              b.y -= dy * diff
            } else if (bPinned) {
              a.x += dx * diff
              a.y += dy * diff
            } else {
              a.x += dx * 0.5 * diff
              a.y += dy * 0.5 * diff
              b.x -= dx * 0.5 * diff
              b.y -= dy * 0.5 * diff
            }
          }
        }
        pts[0].x = ax
        pts[0].y = 3
        if (pinned) {
          pts[N].x = s.pin.x
          pts[N].y = s.pin.y
        }

        let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`
        for (let i = 1; i < N; i++) {
          const xc = (pts[i].x + pts[i + 1].x) / 2
          const yc = (pts[i].y + pts[i + 1].y) / 2
          d += ` Q ${pts[i].x.toFixed(1)} ${pts[i].y.toFixed(1)} ${xc.toFixed(1)} ${yc.toFixed(1)}`
        }
        d += ` L ${pts[N].x.toFixed(1)} ${pts[N].y.toFixed(1)}`
        pathRef.current?.setAttribute('d', d)
        path2Ref.current?.setAttribute('d', d)
        if (beadRef.current) {
          beadRef.current.setAttribute('cx', pts[N].x.toFixed(1))
          beadRef.current.setAttribute('cy', pts[N].y.toFixed(1))
        }
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const setPin = (e) => {
    const r = boxRef.current.getBoundingClientRect()
    if (st.current.pin) st.current.pin = { x: e.clientX - r.left, y: e.clientY - r.top }
  }
  const onDown = (e) => {
    e.stopPropagation()
    setPin(e)
    st.current.dragging = true
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }
  const onMove = (e) => {
    if (!st.current.dragging) return
    setPin(e)
  }
  const onUp = (e) => {
    if (!st.current.dragging) return
    st.current.dragging = false
    e.currentTarget.releasePointerCapture?.(e.pointerId)
  }

  return (
    <div
      ref={boxRef}
      className="absolute top-4 bottom-4 left-1/2 -translate-x-1/2"
      style={{ zIndex, width: 44, touchAction: 'none', cursor: 'grab' }}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
    >
      <svg width="44" height="100%" style={{ overflow: 'visible', display: 'block' }}>
        <defs>
          <radialGradient id="beadGrad" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#c98a4b" />
            <stop offset="70%" stopColor="#7a4a22" />
            <stop offset="100%" stopColor="#4a2810" />
          </radialGradient>
        </defs>
        <path ref={pathRef} fill="none" stroke="#6b3d17" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        <path ref={path2Ref} fill="none" stroke="rgba(255,232,196,0.5)" strokeWidth="1" strokeLinecap="round" strokeDasharray="5 5" />
        <circle ref={beadRef} r="6.5" fill="url(#beadGrad)" stroke="rgba(0,0,0,0.35)" strokeWidth="0.5" />
      </svg>
    </div>
  )
}

export default function BookMode({ onClose }) {
  const { data } = useProfile()
  const { profile, experiences, education, projects, techStacks, achievements, socials } = data
  const [spread, setSpread] = useState(0)
  const [flipping, setFlipping] = useState(null)
  const [muted, setMuted] = useState(false)
  const [doc, setDoc] = useState(null)
  const [wide, setWide] = useState(() => (typeof window !== 'undefined' ? window.innerWidth >= 720 : true))
  const [vp, setVp] = useState(() => ({ w: typeof window !== 'undefined' ? window.innerWidth : 1280, h: typeof window !== 'undefined' ? window.innerHeight : 800 }))
  const [flow, setFlow] = useState(null)
  const rulerBodyRef = useRef(null)
  const rulerBlocksRef = useRef(null)
  const blockRefs = useRef({})
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth >= 720
      setWide((prev) => {
        if (prev !== w) setSpread(0)
        return w
      })
      setVp({ w: window.innerWidth, h: window.innerHeight })
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

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

  const sections = useMemo(() => {
    const secs = []
    const aboutSents = (profile.about || '').split(/(?<=[.!?])\s+/).filter(Boolean)
    const aboutBlocks = [{
      key: 'lead',
      node: (
        <div>
          <img src={profile.heroImage} alt="" className="w-20 h-20 object-cover rounded-xl float-right ml-3 mb-2 shadow-md" />
          <p className="book-body text-sm">{aboutSents.slice(0, 2).join(' ') || profile.about}</p>
        </div>
      ),
    }]
    aboutSents.slice(2).forEach((s, i) => aboutBlocks.push({ key: 'as' + i, node: <p className="book-body text-sm">{s}</p> }))
    aboutBlocks.push({
      key: 'contact',
      node: (
        <div className="space-y-1 text-xs text-stone-600 clear-both">
          {profile.location && <p className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {profile.location}</p>}
          {profile.email && <p>✉️ {profile.email}</p>}
        </div>
      ),
    })
    secs.push({ id: 'about', title: 'About Me', tocLabel: 'About Me', blocks: aboutBlocks })

    if (education?.length) {
      const eduBlocks = []
      education.forEach((ed) => {
        eduBlocks.push({
          key: 'ed' + ed.id,
          node: (
            <div className="border-l-2 border-amber-300 pl-3">
              <p className="font-bold text-stone-800 text-sm">{ed.institution}</p>
              <p className="text-xs text-amber-800">{ed.degree}</p>
              <p className="text-[11px] text-stone-500">{ed.period}</p>
            </div>
          ),
        })
        if (ed.photos?.length) {
          eduBlocks.push({
            key: 'edcap' + ed.id,
            node: <p className="text-[11px] text-amber-800 font-medium">🎓 Convocation — {ed.institution} · tap any photo to enlarge</p>,
          })
          ed.photos.forEach((src, i) => {
            eduBlocks.push({
              key: 'edph' + ed.id + '-' + i,
              node: (
                <button onClick={() => setDoc({ url: src, title: `${ed.institution} — Convocation` })} className="group block w-full rounded-xl border border-amber-200 shadow overflow-hidden bg-stone-100" title="Tap to enlarge">
                  <img src={src} alt="Convocation" className="w-full h-56 object-contain transition-transform duration-300 group-hover:scale-[1.02]" onError={(e) => { e.currentTarget.style.display = 'none' }} />
                </button>
              ),
            })
          })
        }
      })
      secs.push({ id: 'education', title: 'Education', tocLabel: 'Education', blocks: eduBlocks })
    }

    if (experiences?.length) {
      const expBlocks = []
      experiences.forEach((e, ei) => {
        expBlocks.push({
          key: 'exp' + e.id + '-head',
          tocLabel: e.company,
          node: (
            <div className={ei > 0 ? 'pt-2.5 border-t border-amber-200/60' : ''}>
              <p className="font-bold text-stone-800">{e.company}</p>
              <p className="text-sm text-amber-800">{e.position}</p>
              <p className="text-xs text-stone-500">{e.duration} · {e.location}</p>
              {e.description && <p className="book-body text-sm mt-1.5">{e.description}</p>}
            </div>
          ),
        })
        ;(e.highlights || []).forEach((h, i) => expBlocks.push({
          key: 'exp' + e.id + '-h' + i,
          node: (
            <div className="text-xs text-stone-600 leading-snug flex gap-1.5">
              <span className="text-amber-600 mt-0.5">◆</span>
              <span>{h}</span>
            </div>
          ),
        }))
        if (e.skills?.length) expBlocks.push({ key: 'exp' + e.id + '-sk', node: <div className="pt-0.5"><Skills list={e.skills} /></div> })
      })
      secs.push({ id: 'experience', title: 'Experience', tocLabel: 'Experience', blocks: expBlocks })
    }

    if (projects?.length) {
      secs.push({
        id: 'projects', title: 'Projects', tocLabel: 'Projects',
        blocks: projects.map((pr) => ({
          key: 'pr' + pr.id, tocLabel: pr.title,
          node: (
            <div>
              <p className="font-bold text-stone-800 text-sm">{pr.title}</p>
              <p className="text-xs text-amber-800 mb-1">{pr.category}</p>
              <p className="book-body text-xs leading-snug mb-1">{pr.description}</p>
              <div><Skills list={pr.technologies} /></div>
              {(pr.liveUrl || pr.githubUrl) && (
                <div className="flex gap-3 mt-1.5">
                  {pr.liveUrl && <a href={pr.liveUrl} target="_blank" rel="noopener noreferrer" className="text-[11px] font-semibold text-amber-800 underline decoration-dotted underline-offset-2 hover:text-amber-900">↗ Live demo</a>}
                  {pr.githubUrl && <a href={pr.githubUrl} target="_blank" rel="noopener noreferrer" className="text-[11px] font-semibold text-stone-600 underline decoration-dotted underline-offset-2 hover:text-stone-800">Code</a>}
                </div>
              )}
            </div>
          ),
        })),
      })
    }

    if (categories.length) {
      secs.push({
        id: 'skills', title: 'Tech Stack', tocLabel: 'Tech Stack',
        blocks: categories.map((cat) => ({
          key: 'sc' + cat, tocLabel: cat,
          node: (
            <div>
              <p className="font-semibold text-amber-800 text-sm">{cat}</p>
              <p className="text-xs text-stone-600">{techStacks.filter((t) => t.category === cat).map((t) => t.name).join(' · ')}</p>
            </div>
          ),
        })),
      })
    }

    if (achievements?.length) {
      secs.push({
        id: 'ach', title: 'Achievements', tocLabel: 'Achievements',
        blocks: achievements.map((a) => {
          const Icon = getIcon(a.icon)
          return {
            key: 'ac' + a.id,
            node: (
              <div className="flex gap-2.5">
                <Icon className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-stone-800 text-sm">{a.title}</p>
                  <p className="text-xs text-stone-500">{a.issuer} · {a.date}</p>
                  <p className="book-body text-xs leading-snug">{a.description}</p>
                </div>
              </div>
            ),
          }
        }),
      })
    }
    return secs
  }, [profile, education, experiences, projects, categories, techStacks, achievements])

  const allBlocks = useMemo(() => {
    const arr = []
    sections.forEach((sec) => sec.blocks.forEach((b) => arr.push({ id: sec.id + '|' + b.key, node: b.node })))
    return arr
  }, [sections])

  const stageW = wide ? Math.min(0.94 * vp.w, 780) : Math.min(0.96 * vp.w, 440)
  const stageH = Math.min(0.74 * vp.h, 560)
  const leafW = wide ? stageW / 2 : stageW

  useLayoutEffect(() => {
    const body = rulerBodyRef.current
    const blocksEl = rulerBlocksRef.current
    if (!body || !blocksEl) return
    const headOffset = blocksEl.getBoundingClientRect().top - body.getBoundingClientRect().top
    const avail = body.clientHeight - headOffset
    if (avail <= 20) return
    const heights = {}
    for (const id in blockRefs.current) {
      const el = blockRefs.current[id]
      if (el) heights[id] = el.offsetHeight
    }
    const packed = sections.map((sec) => {
      let cur = []
      let used = 0
      const secPages = []
      sec.blocks.forEach((b) => {
        const bh = heights[sec.id + '|' + b.key] || 0
        const add = bh + (cur.length ? BLOCK_GAP : 0)
        if (cur.length && used + add > avail) {
          secPages.push(cur)
          cur = [b]
          used = bh
        } else {
          cur.push(b)
          used += add
        }
      })
      if (cur.length) secPages.push(cur)
      return { sec, secPages }
    })
    setFlow({ packed })
  }, [sections, allBlocks, stageH, leafW])

  const pages = useMemo(() => {
    const p = [{ type: 'cover' }, { type: 'contents' }]
    const toc = []
    if (flow) {
      flow.packed.forEach(({ sec, secPages }) => {
        const startGi = p.length
        const pageOfBlock = {}
        secPages.forEach((blocks, pi) => {
          const gi = p.length
          blocks.forEach((b) => { pageOfBlock[b.key] = gi })
          p.push({ type: 'flow', title: sec.title, cont: pi > 0, blocks })
        })
        const sub = []
        if (sec.id !== 'skills') sec.blocks.forEach((b) => { if (b.tocLabel) sub.push({ label: b.tocLabel, page: pageOfBlock[b.key] }) })
        toc.push({ label: sec.tocLabel, page: startGi, sub })
      })
    }
    p.push({ type: 'resume' })
    p.push({ type: 'back' })
    p.push({ type: 'end' })
    if (p.length % 2 !== 0) p.splice(p.length - 2, 0, { type: 'divider' })
    toc.push({ label: 'Résumé', page: p.findIndex((x) => x.type === 'resume') })
    toc.push({ label: 'Contact', page: p.findIndex((x) => x.type === 'back') })
    const contents = p.find((pg) => pg.type === 'contents')
    if (contents) contents.toc = toc
    return p
  }, [flow])

  const leaves = wide ? Math.ceil(pages.length / 2) : pages.length

  const jumpTo = (pi) => {
    const target = wide ? Math.ceil(pi / 2) : pi
    if (target === spread) return
    if (!muted) playFlipSound()
    setFlipping(null)
    setSpread(target)
  }

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
          <div className="book-mono">
            <span className="text-3xl text-[#3fb950]/80">{'{ }'}</span>
            <p className="text-slate-300/85 text-base mt-5 leading-relaxed">
              <span className="text-slate-500">/*</span> Code with impact.<br />Build with heart. <span className="text-slate-500">*/</span>
            </p>
          </div>
        </div>
      )
    }
    if (pg.type === 'end') {
      return (
        <div className="book-cover h-full flex flex-col items-center justify-center text-center gap-3 p-8">
          <CoverCorners />
          <p className="book-mono text-slate-400/70 tracking-[0.3em] text-xs">// EOF</p>
          <p className="book-mono text-2xl code-foil">Thanks for reading.</p>
          <div className="w-14 h-px bg-[#3fb950]/50 my-1" />
          <p className="book-mono text-slate-300/85 text-sm">
            <span className="text-[#ff7b72]">return</span> &lt;<span className="text-[#79c0ff]">LetsBuild</span> /&gt;
          </p>
          <p className="book-signature text-[#7ee787] text-3xl mt-2 -rotate-3">{profile.name}</p>
          <span className="book-mono text-2xl mt-1 text-[#3fb950]/70">{'</>'}</span>
        </div>
      )
    }
    switch (pg.type) {
      case 'cover':
        return (
          <div className="book-cover h-full flex flex-col overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5 shrink-0">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-3 px-6">
              <div className="w-20 h-20 rounded-2xl overflow-hidden ring-1 ring-[#3fb950]/50 shadow-[0_0_26px_rgba(63,185,80,0.28)]">
                <img src={profile.heroImage} alt={profile.name} className="w-full h-full object-cover" />
              </div>
              <h1 className="book-mono text-2xl font-bold code-foil">{profile.name}</h1>
              <p className="book-mono text-[#58a6ff]/90 text-[11px] tracking-wide">// {profile.headline}</p>
            </div>
          </div>
        )
      case 'contents':
        return (
          <Leaf idx={idx}>
            <h2 className="book-heading">Contents</h2>
            <ul className="space-y-1">
              {(pg.toc || []).map((t) => (
                <li key={t.label}>
                  <button onClick={() => jumpTo(t.page)} className="w-full flex items-baseline gap-2 text-left group">
                    <span className="text-sm font-semibold text-stone-800 group-hover:text-amber-800 transition-colors">{t.label}</span>
                    <span className="flex-1 border-b border-dotted border-stone-300 self-end mb-1" />
                    <span className="text-sm text-amber-800 tabular-nums book-pagenum">{t.page + 1}</span>
                  </button>
                  {t.sub?.length > 0 && (
                    <ul className="ml-3.5">
                      {t.sub.map((s, si) => (
                        <li key={si}>
                          <button onClick={() => jumpTo(s.page)} className="w-full flex items-baseline gap-2 text-left group">
                            <span className="text-[11px] text-stone-600 group-hover:text-amber-800 transition-colors truncate">{s.label}</span>
                            <span className="flex-1 border-b border-dotted border-stone-200 self-end mb-1" />
                            <span className="text-[11px] text-stone-500 tabular-nums book-pagenum">{s.page + 1}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </Leaf>
        )
      case 'flow':
        return (
          <Leaf idx={idx}>
            <h2 className="book-heading">{pg.title}{pg.cont ? ' (cont.)' : ''}</h2>
            <div>
              {pg.blocks.map((b, i) => (
                <div key={b.key} style={{ marginBottom: i < pg.blocks.length - 1 ? BLOCK_GAP : 0 }}>{b.node}</div>
              ))}
            </div>
          </Leaf>
        )
      case 'resume':
        return (
          <div className="h-full flex flex-col p-5">
            <h2 className="book-heading text-center">My Résumé</h2>
            <button onClick={() => setDoc({ url: profile.links.resume, title: 'Résumé' })} className="relative flex-1 min-h-0 rounded-lg overflow-hidden border border-amber-200 shadow group">
              <img src="/resume-preview.jpg" alt="Résumé preview" className="w-full h-full object-cover object-top" />
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
            <CoverCorners />
            <h2 className="book-mono text-2xl font-bold code-foil">$ connect</h2>
            <div className="w-14 h-px bg-[#3fb950]/50 my-1" />
            <div className="space-y-1 book-mono text-slate-300/90 text-sm">
              {socials.map((s) => (
                <p key={s.id}><span className="text-slate-500">→</span> {s.name}</p>
              ))}
            </div>
            <a href={referHref} className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3fb950] text-[#0d1117] text-sm font-semibold hover:bg-[#56d364] transition book-mono">
              <Mail className="w-4 h-4" /> Refer me by email
            </a>
            <p className="book-signature text-[#7ee787] text-3xl mt-2 -rotate-3">{profile.name}</p>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 z-[80] flex flex-col items-center justify-center p-4 overflow-hidden" style={{ background: '#150e08' }}>
      <div className="absolute opacity-0 pointer-events-none" style={{ left: -99999, top: 0, width: leafW, height: stageH }} aria-hidden>
        <div className="h-full flex flex-col p-5 sm:p-6">
          <div ref={rulerBodyRef} className="flex-1 min-h-0 overflow-hidden">
            <h2 className="book-heading">Ag</h2>
            <div ref={rulerBlocksRef}>
              {allBlocks.map((b) => (
                <div
                  key={b.id}
                  ref={(el) => {
                    if (el) blockRefs.current[b.id] = el
                    else delete blockRefs.current[b.id]
                  }}
                >
                  {b.node}
                </div>
              ))}
            </div>
          </div>
          <div className="book-pagenum text-[11px] pt-2">— 1 —</div>
        </div>
      </div>
      {bgImg && (
        <img
          src={bgImg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-25 transition-opacity duration-1000 pointer-events-none"
          style={{ filter: 'blur(2px)' }}
          onError={() => setBgImg(null)}
        />
      )}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 35%, rgba(74,49,32,0.68) 0%, rgba(43,28,18,0.85) 45%, rgba(21,14,8,0.96) 100%)' }} />
      {decor.map((e, i) => (
        <span key={i} className="absolute text-8xl md:text-9xl opacity-[0.14] select-none pointer-events-none" style={DECOR_POS[i % DECOR_POS.length]}>
          {e}
        </span>
      ))}

      <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
        {profile.showBookDownload && profile.links.bookPdf && (
          <a
            href={profile.links.bookPdf}
            download
            className="inline-flex items-center gap-1.5 h-11 pl-3 pr-4 rounded-full bg-black/45 backdrop-blur-sm border border-amber-200/40 text-amber-50 hover:bg-black/65 hover:border-amber-200/70 shadow-lg transition font-semibold"
            aria-label="Download book PDF"
            title="Download this book as PDF"
          >
            <Download className="w-5 h-5" /> <span className="text-sm hidden sm:inline">Book PDF</span>
          </a>
        )}
        <button
          onClick={() => setMuted((m) => !m)}
          className="w-11 h-11 grid place-items-center rounded-full bg-black/45 backdrop-blur-sm border border-amber-200/40 text-amber-50 hover:bg-black/65 hover:border-amber-200/70 shadow-lg transition"
          aria-label={muted ? 'Unmute page-flip sound' : 'Mute page-flip sound'}
          title={muted ? 'Unmute' : 'Mute'}
        >
          {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
        <button
          onClick={onClose}
          className="inline-flex items-center gap-1.5 h-11 pl-3 pr-4 rounded-full bg-black/45 backdrop-blur-sm border border-amber-200/40 text-amber-50 hover:bg-red-500/80 hover:border-red-300/70 shadow-lg transition font-semibold"
          aria-label="Close book"
          title="Close book"
        >
          <X className="w-5 h-5" /> <span className="text-sm">Close</span>
        </button>
      </div>

      {greeting && (
        <div className="mb-1.5 book-serif text-lg md:text-2xl flex items-center gap-2">
          <span className="text-2xl md:text-3xl">{greeting.emoji}</span>
          <span className="bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 bg-clip-text text-transparent font-bold">{greeting.text}</span>
        </div>
      )}
      <p className="book-serif text-amber-100/50 text-sm mb-4 hidden sm:block italic">A journey through my work — turn the page</p>

      <div style={{ perspective: '2600px', width: wide ? 'min(94vw, 780px)' : 'min(96vw, 440px)', height: 'min(74vh, 560px)', transform: `translateX(${wide ? (spread === 0 ? '-25%' : spread === leaves ? '25%' : '0%') : '0%'})`, transition: `transform ${FLIP_MS}ms cubic-bezier(0.4, 0.05, 0.2, 1)` }}>
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
            const common = {
              transformStyle: 'preserve-3d',
              transformOrigin: 'left center',
              transform: `rotateY(${turned ? -180 : 0}deg)`,
              transition: `transform ${FLIP_MS}ms ${FLIP_EASE}`,
              zIndex: z,
            }
            if (wide) {
              return (
                <div key={i} className="absolute top-0" style={{ left: '50%', width: '50%', height: '100%', ...common }}>
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
            }
            return (
              <div key={i} className="book-leaf book-page absolute top-0" style={{ left: 0, width: '100%', height: '100%', backfaceVisibility: 'hidden', ...common }}>
                {renderContent(pages[i], i)}
                <span className="book-curl" />
              </div>
            )
          })}
          {wide && (
            <>
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-6 pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.28), transparent)', zIndex: 1000 }} />
              <BindingThread key={spread} zIndex={1001} />
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4 mt-5">
        <button
          onClick={() => jumpTo(0)}
          className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/10 text-white/90 font-semibold hover:bg-white/20 transition ${spread === 0 ? 'invisible' : ''}`}
          title="Back to cover"
          aria-label="Restart from cover"
        >
          <RotateCcw className="w-4 h-4" /> <span className="hidden sm:inline">Restart</span>
        </button>
        <button onClick={() => turn('prev')} className={`inline-flex items-center gap-1 px-5 py-2.5 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 transition ${spread === 0 ? 'invisible' : ''}`}>
          <ChevronLeft className="w-4 h-4" /> Prev
        </button>
        <span className="book-pagenum text-amber-100/70 text-sm tabular-nums w-16 text-center">{spread} / {leaves}</span>
        <button onClick={() => turn('next')} className={`inline-flex items-center gap-1 px-5 py-2.5 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 transition ${spread === leaves ? 'invisible' : ''}`}>
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {doc && <DocViewer url={doc.url} title={doc.title} onClose={() => setDoc(null)} />}
    </div>
  )
}
