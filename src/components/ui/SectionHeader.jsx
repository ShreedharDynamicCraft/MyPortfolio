export default function SectionHeader({ title, subtitle, variant = 'brand' }) {
  const heading =
    variant === 'gradient'
      ? 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent'
      : 'text-4xl md:text-5xl lg:text-6xl text-brand font-bold'

  return (
    <div className="relative text-center mb-16 md:mb-20 z-10">
      <h2 className={`${heading} mb-6 transform hover:scale-105 transition-transform duration-500`}>
        {title}
      </h2>
      <div className="w-32 h-1.5 bg-gradient-to-r from-brand via-purple-500 to-pink-500 mx-auto rounded-full animate-pulse shadow-lg" />
      {subtitle && (
        <p className="text-lg md:text-xl text-ink mt-8 max-w-2xl mx-auto font-medium leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}
