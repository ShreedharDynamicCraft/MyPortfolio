export default function AnalogClock({ h, m, s, size = 52 }) {
  const hourDeg = (h % 12) * 30 + m * 0.5
  const minDeg = m * 6 + s * 0.1
  const secDeg = s * 6

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className="shrink-0" aria-hidden="true">
      <defs>
        <radialGradient id="clockface" cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#eef2ff" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="47" fill="url(#clockface)" stroke="#c7d2fe" strokeWidth="2" />
      {[...Array(12)].map((_, i) => {
        const a = (i * 30 * Math.PI) / 180
        const outer = 45
        const inner = i % 3 === 0 ? 38 : 41
        return (
          <line
            key={i}
            x1={50 + inner * Math.sin(a)}
            y1={50 - inner * Math.cos(a)}
            x2={50 + outer * Math.sin(a)}
            y2={50 - outer * Math.cos(a)}
            stroke={i % 3 === 0 ? '#6366f1' : '#cbd5e1'}
            strokeWidth={i % 3 === 0 ? 2.5 : 1.5}
            strokeLinecap="round"
          />
        )
      })}
      <line x1="50" y1="54" x2="50" y2="30" stroke="#343d38" strokeWidth="4" strokeLinecap="round" transform={`rotate(${hourDeg} 50 50)`} />
      <line x1="50" y1="56" x2="50" y2="20" stroke="#4e45d5" strokeWidth="3" strokeLinecap="round" transform={`rotate(${minDeg} 50 50)`} />
      <line x1="50" y1="60" x2="50" y2="16" stroke="#ec4899" strokeWidth="1.5" strokeLinecap="round" transform={`rotate(${secDeg} 50 50)`} />
      <circle cx="50" cy="50" r="3.2" fill="#4e45d5" />
      <circle cx="50" cy="50" r="1.4" fill="#fff" />
    </svg>
  )
}
