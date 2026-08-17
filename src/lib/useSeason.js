import { useEffect, useState } from 'react'
import { getGreeting, istParts, BUILTIN_FESTIVALS } from './greeting'
import { getSeasonalTheme } from './theme'

let holidaysPromise = null

function emojiFor(name = '') {
  const n = name.toLowerCase()
  if (/independence|republic|gandhi/.test(n)) return '🇮🇳'
  if (/christmas/.test(n)) return '🎄'
  if (/diwali|deepavali/.test(n)) return '🪔'
  if (/holi/.test(n)) return '🎨'
  if (/eid/.test(n)) return '🌙'
  if (/new year/.test(n)) return '🎉'
  if (/raksha|rakhi/.test(n)) return '🪢'
  return '🎊'
}

async function fetchHolidays(year) {
  const res = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/IN`)
  if (!res.ok) throw new Error(`holidays ${res.status}`)
  const data = await res.json()
  return data.map((h) => {
    const [, mo, d] = h.date.split('-').map(Number)
    return { m: mo, d, text: h.localName || h.name, emoji: emojiFor(h.name) }
  })
}

function loadHolidays(year) {
  if (!holidaysPromise) {
    holidaysPromise = fetchHolidays(year)
      .then((api) => {
        const seen = new Set(api.map((f) => `${f.m}-${f.d}`))
        return [...api, ...BUILTIN_FESTIVALS.filter((f) => !seen.has(`${f.m}-${f.d}`))]
      })
      .catch(() => BUILTIN_FESTIVALS)
  }
  return holidaysPromise
}

export function useSeason() {
  const [now, setNow] = useState(() => new Date())
  const [festivals, setFestivals] = useState(null)

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    let alive = true
    const { y } = istParts(new Date())
    loadHolidays(y).then((list) => alive && setFestivals(list))
    return () => {
      alive = false
    }
  }, [])

  return {
    now,
    greeting: getGreeting(now, festivals),
    theme: getSeasonalTheme(now),
  }
}
