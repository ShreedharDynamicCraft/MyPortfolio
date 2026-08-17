import { useMemo, useState } from 'react'
import { useProfile } from '../../lib/ProfileContext'
import SectionHeader from '../ui/SectionHeader'

const GOLDEN_ANGLE = 137.5 * (Math.PI / 180)

function layout(count, radius) {
  return Array.from({ length: count }, (_, i) => {
    const r = radius * Math.sqrt((i + 0.5) / count)
    const theta = i * GOLDEN_ANGLE
    return { x: r * Math.cos(theta), y: r * Math.sin(theta) }
  })
}

function TechBubble({ items }) {
  const [hovered, setHovered] = useState(null)
  const positions = useMemo(() => layout(items.length, 205), [items.length])

  return (
    <div className="relative mx-auto mb-14" style={{ width: 540, maxWidth: '90vw', aspectRatio: '1 / 1' }}>
      <div className="absolute inset-0 rounded-full border-2 border-brand/20 animate-ping" style={{ animationDuration: '4s' }} />
      <div className="absolute inset-4 rounded-full bg-gradient-to-br from-white/60 via-blue-50/80 to-purple-50/60 backdrop-blur-lg border-2 border-white/60 shadow-2xl">
        {items.map((tech, i) => (
          <div
            key={tech.id}
            className="absolute left-1/2 top-1/2 transition-[transform] duration-500 ease-out"
            style={{ transform: `translate(calc(-50% + ${positions[i]?.x ?? 0}px), calc(-50% + ${positions[i]?.y ?? 0}px))` }}
          >
            <div
              className="group relative"
              style={{ animation: `heroFloat ${3 + (i % 4)}s ease-in-out ${i * 0.12}s infinite alternate` }}
              onMouseEnter={() => setHovered(tech.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className={`relative bg-gradient-to-br ${tech.color} rounded-2xl p-2.5 sm:p-3 shadow-xl border border-white/40 transition-transform duration-300 hover:scale-125 hover:z-20 cursor-pointer`}>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/5 via-white/25 to-white/45" />
                <img
                  src={tech.icon}
                  alt={tech.name}
                  className="relative z-10 w-6 h-6 sm:w-8 sm:h-8 object-contain"
                  onError={(e) => (e.currentTarget.style.visibility = 'hidden')}
                />
              </div>
              {hovered === tech.id && (
                <div className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-black/80 text-white text-xs rounded-lg whitespace-nowrap z-50">
                  {tech.name}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Chip({ active, onClick, children, count }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
        active
          ? 'bg-brand text-white border-brand shadow-lg scale-105'
          : 'bg-white/70 text-ink border-white/60 hover:border-brand/40 hover:scale-105'
      }`}
    >
      {children}
      {count != null && <span className={`ml-2 text-xs ${active ? 'text-white/80' : 'text-gray-400'}`}>{count}</span>}
    </button>
  )
}

export default function TechStack() {
  const { data } = useProfile()
  const techStacks = data.techStacks
  const categories = useMemo(() => [...new Set(techStacks.map((t) => t.category))], [techStacks])
  const [active, setActive] = useState('All')

  const items = active === 'All' ? techStacks : techStacks.filter((t) => t.category === active)
  const countFor = (cat) => techStacks.filter((t) => t.category === cat).length

  return (
    <section id="skills" className="relative bg-indigo-50 py-20 px-4 md:px-8 overflow-hidden">
      <SectionHeader title="Tech Stack" subtitle="Technologies I work with to bring ideas to life. Tap a category to filter." />

      <div className="relative z-10 flex flex-wrap justify-center gap-2.5 mb-10 max-w-3xl mx-auto">
        <Chip active={active === 'All'} onClick={() => setActive('All')} count={techStacks.length}>
          All
        </Chip>
        {categories.map((cat) => (
          <Chip key={cat} active={active === cat} onClick={() => setActive(cat)} count={countFor(cat)}>
            {cat}
          </Chip>
        ))}
      </div>

      <TechBubble items={items} />

      <div className="relative max-w-6xl mx-auto z-10">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const dimmed = active !== 'All' && active !== category
            return (
              <button
                key={category}
                onClick={() => setActive(active === category ? 'All' : category)}
                className={`group relative text-left bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.03] border ${
                  active === category ? 'border-brand ring-2 ring-brand/20' : 'border-white/50'
                } ${dimmed ? 'opacity-50' : 'opacity-100'}`}
              >
                <h4 className="text-lg font-bold text-brand mb-4">{category}</h4>
                <div className="space-y-1.5">
                  {techStacks
                    .filter((t) => t.category === category)
                    .map((tech) => (
                      <div key={tech.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/60 transition-colors">
                        <img src={tech.icon} alt="" loading="lazy" className="w-6 h-6 object-contain" />
                        <span className="text-ink font-medium text-sm">{tech.name}</span>
                      </div>
                    ))}
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
