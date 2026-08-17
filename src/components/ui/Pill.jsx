export default function Pill({ children, className = '' }) {
  return (
    <span
      className={`px-4 py-2 bg-gradient-to-r from-white to-gray-50 text-ink rounded-full text-xs md:text-sm font-semibold border border-gray-200 hover:border-brand transition-all duration-300 shadow-sm hover:scale-105 transform-gpu ${className}`}
    >
      {children}
    </span>
  )
}
