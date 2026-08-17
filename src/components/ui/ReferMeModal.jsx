import { useEffect, useMemo, useState } from 'react'
import { X, Copy, Check, Mail, RefreshCw, FileText, Globe, Plus } from 'lucide-react'
import { useProfile } from '../../lib/ProfileContext'
import { LinkedinIcon, GithubIcon } from './BrandIcons'

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function buildProse(data) {
  const { name, headline, about } = data.profile
  const current = data.experiences?.find((e) => e.type === 'Full-time') || data.experiences?.[0]
  const roleLine = current ? `${current.position} at ${current.company}` : headline
  const skills = (current?.skills || data.techStacks.slice(0, 6).map((t) => t.name)).slice(0, 6).join(', ')
  return `Hi [Name],

I'd like to refer ${name}${headline ? ` — ${headline}` : ''} — for a role on your team.

Currently: ${roleLine}.
Core skills: ${skills}.

${about ? about + ' ' : ''}Happy to connect you both — thank you!`
}

export default function ReferMeModal({ onClose }) {
  const { data } = useProfile()
  const { name, email, links } = data.profile
  const portfolio = links.portfolio || (typeof window !== 'undefined' ? window.location.origin : '')
  const resumeUrl = links.resume?.startsWith('/') ? `${portfolio}${links.resume}` : links.resume

  const allChips = useMemo(
    () =>
      [
        { key: 'portfolio', label: 'Portfolio', url: portfolio, Icon: Globe },
        { key: 'resume', label: 'Résumé', url: resumeUrl, Icon: FileText },
        { key: 'linkedin', label: 'LinkedIn', url: links.linkedin, Icon: LinkedinIcon },
        { key: 'github', label: 'GitHub', url: links.github, Icon: GithubIcon },
        { key: 'email', label: 'Email', url: email ? `mailto:${email}` : '', display: email, Icon: Mail },
      ].filter((c) => c.url),
    [portfolio, links, email],
  )

  const [disabled, setDisabled] = useState({})
  const [text, setText] = useState(() => buildProse(data))
  const [copied, setCopied] = useState(false)

  const included = allChips.filter((c) => !disabled[c.key])
  const excluded = allChips.filter((c) => disabled[c.key])
  const toggle = (key) => setDisabled((prev) => ({ ...prev, [key]: !prev[key] }))

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const plainLinks = included.map((c) => `${c.label}: ${c.display || c.url}`).join('\n')
  const htmlLinks = included.map((c) => `<a href="${c.url}">${c.label}</a>`).join(' &nbsp;·&nbsp; ')

  const copy = async () => {
    const linkPart = included.length ? `<br><br><b>Links:</b> ${htmlLinks}` : ''
    const html = `<div style="font-family:sans-serif">${esc(text).replace(/\n/g, '<br>')}${linkPart}</div>`
    const plain = included.length ? `${text}\n\n${plainLinks}` : text
    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/html': new Blob([html], { type: 'text/html' }),
          'text/plain': new Blob([plain], { type: 'text/plain' }),
        }),
      ])
    } catch {
      try {
        await navigator.clipboard.writeText(plain)
      } catch {
      }
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const emailIt = () => {
    const body = included.length ? `${text}\n\n${plainLinks}` : text
    window.location.href = `mailto:?subject=${encodeURIComponent(`Referral: ${name}`)}&body=${encodeURIComponent(body)}`
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[70] flex items-center justify-center p-4 animate-fadeIn" onClick={onClose}>
      <div className="relative bg-white rounded-3xl max-w-lg w-full shadow-2xl animate-scaleIn" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 grid place-items-center" aria-label="Close">
          <X className="w-5 h-5 text-gray-600" />
        </button>
        <div className="p-6 md:p-7">
          <div className="flex items-center justify-between mb-1 pr-8">
            <h3 className="text-xl font-bold text-ink">Refer me 🙌</h3>
            <button onClick={() => { setText(buildProse(data)); setDisabled({}) }} className="inline-flex items-center gap-1 text-xs font-semibold text-brand hover:text-brand-dark" title="Reset draft & links">
              <RefreshCw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
          <p className="text-sm text-gray-500 mb-4">Auto-filled from my profile. Tap a link to exclude it, then copy (links stay clickable) or email.</p>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={9}
            className="w-full text-sm rounded-2xl border border-gray-300 p-4 leading-relaxed focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none resize-y"
          />

          <p className="text-xs font-semibold text-gray-400 mt-4 mb-2">SHARING ({included.length})</p>
          <div className="flex flex-wrap gap-2">
            {included.map(({ key, label, Icon }) => (
              <button key={key} onClick={() => toggle(key)} className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand/10 text-brand text-sm font-semibold hover:bg-brand/20 transition" title="Click to exclude">
                <Icon className="w-3.5 h-3.5" /> {label}
                <X className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100" />
              </button>
            ))}
            {included.length === 0 && <span className="text-sm text-gray-400 italic">No links — prose only.</span>}
          </div>

          {excluded.length > 0 && (
            <>
              <p className="text-xs font-semibold text-gray-400 mt-4 mb-2">NOT SHARING</p>
              <div className="flex flex-wrap gap-2">
                {excluded.map(({ key, label, Icon }) => (
                  <button key={key} onClick={() => toggle(key)} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-dashed border-gray-300 text-gray-400 text-sm font-semibold hover:border-brand hover:text-brand transition" title="Click to include">
                    <Icon className="w-3.5 h-3.5" /> {label}
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                ))}
              </div>
            </>
          )}

          <div className="flex gap-3 mt-5">
            <button onClick={copy} className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand text-white font-semibold hover:bg-brand-dark transition">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy (with links)'}
            </button>
            <button onClick={emailIt} className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-300 font-semibold text-ink hover:bg-gray-50 transition">
              <Mail className="w-4 h-4" /> Email it
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
