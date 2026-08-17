export default function SlideButton({
  href,
  onClick,
  download = false,
  target,
  children,
  className = '',
}) {
  const Comp = href ? 'a' : 'button'
  const anchorProps = href
    ? { href, target, rel: target === '_blank' ? 'noopener noreferrer' : undefined, download: download || undefined }
    : { type: 'button' }

  return (
    <Comp
      {...anchorProps}
      onClick={onClick}
      className={`group relative px-8 py-3.5 bg-transparent border-none cursor-pointer inline-block ${className}`}
    >
      <span className="relative z-10 text-gray-100 font-semibold text-base whitespace-nowrap">
        {children}
      </span>
      <span className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-r from-[#28282d] to-gray-800 rounded-xl transition-all duration-500 group-hover:translate-x-[8%] group-hover:translate-y-[20%] group-hover:w-[110%] group-hover:h-[110%] -z-10 shadow-lg" />
      <span className="absolute translate-x-3 translate-y-3 w-10 h-10 bg-gradient-to-r from-brand/30 to-purple-500/30 backdrop-blur-sm rounded-full transition-all duration-500 group-hover:rounded-xl group-hover:translate-x-0 group-hover:translate-y-0 group-hover:w-full group-hover:h-full -z-20" />
    </Comp>
  )
}
