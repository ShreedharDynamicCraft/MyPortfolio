import { useEffect, useState } from 'react'
import { useProfile } from '../../lib/ProfileContext'
import { heroDecor } from '../../data/defaults'
import SlideButton from '../ui/SlideButton'
import GreetingClock from '../ui/GreetingClock'
import ReferMeModal from '../ui/ReferMeModal'

function useTypewriter(words, { typeMs = 110, deleteMs = 55, holdMs = 1400 } = {}) {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (!words.length) return
    const current = words[wordIndex % words.length]

    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), holdMs)
      return () => clearTimeout(t)
    }
    if (deleting && text === '') {
      setDeleting(false)
      setWordIndex((i) => (i + 1) % words.length)
      return
    }
    const t = setTimeout(
      () => setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1)),
      deleting ? deleteMs : typeMs,
    )
    return () => clearTimeout(t)
  }, [text, deleting, wordIndex, words, typeMs, deleteMs, holdMs])

  return text
}

const DECOR = [
  { src: heroDecor.sun, alt: '', pos: 'bottom-[20%] left-[15%]', anim: 'animate-bounce', style: { animationDuration: '2s' } },
  { src: heroDecor.wave, alt: '', pos: 'top-[15%] left-[10%]', anim: '', style: { animation: 'heroFloat 3s ease-in-out infinite alternate' } },
  { src: heroDecor.cube, alt: '', pos: 'top-[20%] right-[10%]', anim: '', style: { animation: 'rotateY360 4s linear infinite' } },
  { src: heroDecor.dots, alt: '', pos: 'bottom-[15%] right-[15%]', anim: '', style: { animation: 'heroFloat 2.5s ease-in-out infinite alternate-reverse' } },
]

export default function Hero() {
  const { data } = useProfile()
  const { name, roles, about, email, heroImage } = data.profile
  const typed = useTypewriter(roles?.length ? roles : ['Software Developer'])
  const [showRefer, setShowRefer] = useState(false)

  const firstName = name.split(' ')[0]
  const mailto = `mailto:${email}?subject=${encodeURIComponent(`Opportunity for ${name}`)}&body=${encodeURIComponent(
    `Hi ${firstName},\n\nI came across your portfolio and would love to talk about a role/project opportunity.\n\n• Company: \n• Role: \n• A bit about it: \n\nLooking forward to connecting!\n`,
  )}`

  return (
    <section
      id="about"
      className="relative flex flex-col lg:flex-row justify-center items-center min-h-[85vh] px-4 md:px-8 gap-6 overflow-hidden pt-24 lg:pt-20"
    >
      <div className="absolute inset-0 flex items-end justify-start pointer-events-none" aria-hidden="true">
        <div className="text-3xl md:text-5xl xl:text-8xl font-bold text-gray-300 opacity-70 blur-sm select-none ml-4 mb-4">
          {name}
        </div>
      </div>

      <div className="flex flex-col justify-center items-center lg:items-start gap-5 lg:gap-7 w-full lg:w-2/5 z-10 text-center lg:text-left">
        <GreetingClock />
        <h1 className="text-3xl md:text-4xl xl:text-6xl text-ink font-medium leading-tight">{name}</h1>
        <p className="text-xl md:text-3xl xl:text-4xl leading-tight text-ink/90">
          I am a{' '}
          <span className="text-brand font-bold">
            {typed}
            <span className="typewriter-cursor ml-0.5 text-brand">|</span>
          </span>
        </p>

        <p className="text-sm md:text-base w-full lg:w-11/12 font-medium leading-relaxed rounded-2xl shadow-xl p-6 bg-white/80 backdrop-blur-xl border border-white/40 transition-transform duration-500 hover:scale-[1.02]">
          {about}
        </p>

        <div className="flex items-center gap-3 flex-wrap justify-center lg:justify-start">
          <SlideButton href={mailto}>Hire Me</SlideButton>
          <button
            type="button"
            onClick={() => setShowRefer(true)}
            className="px-6 py-3 rounded-lg border-2 border-brand text-brand font-semibold hover:bg-brand hover:text-white transition-colors duration-300"
          >
            Refer Me
          </button>
        </div>
      </div>

      {showRefer && <ReferMeModal onClose={() => setShowRefer(false)} />}

      <div className="relative flex justify-center items-center w-full lg:w-2/5 mt-6 lg:mt-0 z-10">
        <div className="relative p-6 lg:p-8">
          <div
            className="relative w-56 h-72 sm:w-72 sm:h-80 lg:w-80 lg:h-96 rounded-lg overflow-hidden border-[18px] md:border-[25px]"
            style={{ borderColor: '#F5F5DC', animation: 'userImageFloat 6s ease-in-out infinite' }}
          >
            <img
              src={heroImage}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
            />
          </div>

          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            {DECOR.map((d, i) => (
              <div key={i} className={`absolute ${d.pos} ${d.anim}`} style={d.style}>
                <img src={d.src} alt="" className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 drop-shadow-lg" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
