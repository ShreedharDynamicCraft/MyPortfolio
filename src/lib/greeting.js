export const BUILTIN_FESTIVALS = [
  { m: 1, d: 1, text: 'Happy New Year', emoji: '🎉' },
  { m: 1, d: 14, text: 'Happy Makar Sankranti', emoji: '🪁' },
  { m: 1, d: 26, text: 'Happy Republic Day', emoji: '🇮🇳' },
  { m: 3, d: 4, text: 'Happy Holi', emoji: '🎨' },
  { m: 8, d: 15, text: 'Happy Independence Day', emoji: '🇮🇳' },
  { m: 8, d: 28, text: 'Happy Raksha Bandhan', emoji: '🪢' },
  { m: 9, d: 4, text: 'Happy Janmashtami', emoji: '🦚' },
  { m: 10, d: 2, text: 'Gandhi Jayanti', emoji: '🕊️' },
  { m: 10, d: 20, text: 'Happy Dussehra', emoji: '🏹' },
  { m: 11, d: 8, text: 'Happy Diwali', emoji: '🪔' },
  { m: 12, d: 25, text: 'Merry Christmas', emoji: '🎄' },
]

export function istParts(now) {
  const f = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    hour12: false,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    weekday: 'long',
  })
  const p = Object.fromEntries(f.formatToParts(now).map((x) => [x.type, x.value]))
  return { y: +p.year, mo: +p.month, d: +p.day, h: +p.hour % 24, weekday: p.weekday }
}

function daysUntil(y, mo, d, fm, fd) {
  const today = Date.UTC(y, mo - 1, d)
  let target = Date.UTC(y, fm - 1, fd)
  if (target < today) target = Date.UTC(y + 1, fm - 1, fd)
  return Math.round((target - today) / 86400000)
}

export function getGreeting(now = new Date(), festivals = BUILTIN_FESTIVALS) {
  const list = festivals && festivals.length ? festivals : BUILTIN_FESTIVALS
  const { y, mo, d, h, weekday } = istParts(now)

  const today = list.find((f) => f.m === mo && f.d === d)
  if (today) return { text: `${today.text}!`, emoji: today.emoji, festive: true }

  let soon = null
  let soonDays = 99
  for (const f of list) {
    const n = daysUntil(y, mo, d, f.m, f.d)
    if (n > 0 && n < soonDays) {
      soonDays = n
      soon = f
    }
  }
  if (soon && soonDays <= 5) {
    return { text: `${soon.text.replace(/^Happy |^Merry /, '')} in ${soonDays} day${soonDays > 1 ? 's' : ''}`, emoji: soon.emoji, festive: true }
  }

  if (weekday === 'Friday') return { text: 'Happy Friday', emoji: '🎉', festive: false }
  if (weekday === 'Saturday' || weekday === 'Sunday') return { text: 'Happy Weekend', emoji: '🌿', festive: false }
  if (weekday === 'Monday') return { text: 'Happy Monday', emoji: '💪', festive: false }

  if (h < 5) return { text: 'Burning the midnight oil', emoji: '🌙', festive: false }
  if (h < 12) return { text: 'Good morning', emoji: '☀️', festive: false }
  if (h < 17) return { text: 'Good afternoon', emoji: '🌤️', festive: false }
  if (h < 21) return { text: 'Good evening', emoji: '🌆', festive: false }
  return { text: 'Good night', emoji: '🌙', festive: false }
}
