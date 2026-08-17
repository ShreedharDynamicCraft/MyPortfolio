import { useEffect, useRef, useState } from 'react'
import { Send, Paperclip, CheckCircle2, X } from 'lucide-react'
import { useProfile } from '../../lib/ProfileContext'
import SectionHeader from '../ui/SectionHeader'

const FORMSUBMIT_ID = '85f4391c89059b31783e7195332c56ac'

const inputCls =
  'w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition'

export default function Contact() {
  const { data } = useProfile()
  const { email } = data.profile
  const [sent, setSent] = useState(false)
  const [senderName, setSenderName] = useState('')
  const [fileName, setFileName] = useState('')
  const fileRef = useRef(null)
  const nextRef = useRef(null)
  const origin = typeof window !== 'undefined' ? window.location.origin : ''

  useEffect(() => {
    if (typeof window === 'undefined') return
    const q = new URLSearchParams(window.location.search)
    if (q.get('sent') === '1') {
      setSent(true)
      setSenderName(q.get('name') || '')
      window.history.replaceState({}, '', window.location.pathname + '#contact')
    }
  }, [])

  const onSubmit = (e) => {
    const nm = new FormData(e.currentTarget).get('name') || ''
    if (nextRef.current) nextRef.current.value = `${origin}/?sent=1&name=${encodeURIComponent(nm)}#contact`
  }

  return (
    <section id="contact" className="relative bg-indigo-50 py-20 px-4 md:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" aria-hidden="true" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <div className="text-5xl md:text-8xl xl:text-[12rem] font-black bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 bg-clip-text text-transparent opacity-40 select-none">
          CONTACT
        </div>
      </div>

      <SectionHeader title="Let's Connect" subtitle="Have a role, a project, or a question? Send me a message — it lands straight in my inbox." variant="gradient" />

      <div className="relative max-w-xl mx-auto z-10">
        {sent ? (
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/60 text-center">
            <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl md:text-3xl font-black text-ink mb-2">
              Thank you{senderName ? `, ${senderName}` : ''}! 🎉
            </h3>
            <p className="text-gray-600 mb-6">Your message is on its way to my inbox — I'll get back to you soon.</p>
            <button onClick={() => setSent(false)} className="px-5 py-2.5 rounded-xl bg-brand text-white font-semibold hover:bg-brand-dark transition">
              Send another
            </button>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            action={`https://formsubmit.co/${FORMSUBMIT_ID}`}
            method="POST"
            encType="multipart/form-data"
            className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl border border-white/60 space-y-4 text-left"
          >
            <input type="hidden" name="_subject" value="New message from your portfolio" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />
            <input ref={nextRef} type="hidden" name="_next" value={`${origin}/?sent=1#contact`} />
            <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

            <div className="grid sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-sm font-semibold text-gray-700 mb-1.5 block">Your name</span>
                <input name="name" required placeholder="Jane Doe" className={inputCls} />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-gray-700 mb-1.5 block">Your email</span>
                <input name="email" type="email" required placeholder="jane@company.com" className={inputCls} />
              </label>
            </div>

            <label className="block">
              <span className="text-sm font-semibold text-gray-700 mb-1.5 block">
                Phone <span className="text-gray-400 font-normal">(optional)</span>
              </span>
              <input name="phone" type="tel" placeholder="+91 98765 43210" className={inputCls} />
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-gray-700 mb-1.5 block">Message</span>
              <textarea name="message" required rows={5} placeholder="Tell me about the role, project, or idea…" className={`${inputCls} resize-y`} />
            </label>

            <div>
              <span className="text-sm font-semibold text-gray-700 mb-1.5 block">
                Attachment <span className="text-gray-400 font-normal">(optional)</span>
              </span>
              <div className="flex items-center gap-3">
                <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-gray-300 text-gray-600 font-semibold cursor-pointer hover:border-brand hover:text-brand transition">
                  <Paperclip className="w-4 h-4" /> Choose file
                  <input ref={fileRef} name="attachment" type="file" className="hidden" onChange={(e) => setFileName(e.target.files?.[0]?.name || '')} />
                </label>
                {fileName && (
                  <span className="inline-flex items-center gap-1.5 text-sm text-gray-600 truncate max-w-[50%]">
                    {fileName}
                    <button
                      type="button"
                      onClick={() => {
                        if (fileRef.current) fileRef.current.value = ''
                        setFileName('')
                      }}
                      aria-label="Remove file"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-xl hover:scale-[1.02] hover:shadow-2xl transition-all"
            >
              <Send className="w-5 h-5" /> Send message
            </button>
          </form>
        )}

        <p className="text-center text-xs text-gray-400 mt-3">
          Or email me directly at{' '}
          <a href={`mailto:${email}`} className="text-brand hover:underline">{email}</a>
        </p>
      </div>
    </section>
  )
}
