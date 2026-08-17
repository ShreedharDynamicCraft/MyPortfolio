import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X, Download, ExternalLink } from 'lucide-react'

export default function DocViewer({ url, title = 'Document', onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const isPdf = /\.pdf($|\?|#)/i.test(url)

  return createPortal(
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex flex-col p-3 md:p-6 animate-fadeIn" onClick={onClose}>
      <div className="flex items-center justify-between mb-3 max-w-5xl w-full mx-auto" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-white font-semibold text-lg truncate">{title}</h3>
        <div className="flex gap-2 shrink-0">
          <a href={url} download className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 text-white text-sm font-semibold hover:bg-white/20 transition">
            <Download className="w-4 h-4" /> <span className="hidden sm:inline">Download</span>
          </a>
          <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 text-white text-sm font-semibold hover:bg-white/20 transition">
            <ExternalLink className="w-4 h-4" /> <span className="hidden sm:inline">New tab</span>
          </a>
          <button onClick={onClose} className="w-10 h-10 grid place-items-center rounded-xl bg-white/10 text-white hover:bg-white/20 transition" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="flex-1 min-h-0 max-w-5xl w-full mx-auto rounded-xl overflow-auto bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
        {isPdf ? (
          <object data={`${url}#toolbar=1&view=FitH`} type="application/pdf" className="w-full h-full">
            <iframe src={`${url}#toolbar=1&view=FitH`} title={title} className="w-full h-full" />
          </object>
        ) : (
          <img src={url} alt={title} className="w-full h-auto object-contain" />
        )}
      </div>
    </div>,
    document.body,
  )
}
