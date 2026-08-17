const SHAPES = [
  { className: 'top-16 left-8 w-14 h-14 from-cyan-400 to-blue-500 rounded-full animate-bounce', style: { animationDuration: '4s' } },
  { className: 'top-1/4 right-12 w-10 h-10 from-pink-400 to-purple-500 rounded-full animate-pulse', style: {} },
  { className: 'bottom-32 left-1/4 w-16 h-16 from-green-400 to-emerald-500 rounded-lg rotate-45 animate-pulse', style: {} },
  { className: 'bottom-16 right-16 w-12 h-12 from-yellow-400 to-orange-500 rounded-full animate-bounce', style: { animationDelay: '1.5s' } },
]

export default function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {SHAPES.map((s, i) => (
        <div
          key={i}
          className={`absolute bg-gradient-to-r opacity-20 ${s.className}`}
          style={s.style}
        />
      ))}
    </div>
  )
}
