import { istParts } from './greeting'

const DEFAULT = {
  name: 'default',
  bg: 'linear-gradient(to bottom right, #eff6ff, #eef2ff, #faf5ff)',
  banner: null,
}

const SEASONS = [
  { m: 11, d: 8, name: 'Diwali', bg: 'linear-gradient(135deg,#fff7ed 0%,#fef3c7 45%,#fee2e2 100%)', banner: '🪔 Happy Diwali! Wishing you light & prosperity 🪔', accent: '#f59e0b' },
  { m: 3, d: 4, name: 'Holi', bg: 'linear-gradient(135deg,#fce7f3 0%,#e0f2fe 30%,#dcfce7 65%,#fef9c3 100%)', banner: '🎨 Happy Holi! A splash of colours your way 🎨', accent: '#ec4899' },
  { m: 12, d: 25, name: 'Christmas', bg: 'linear-gradient(135deg,#fef2f2 0%,#ffffff 50%,#ecfdf5 100%)', banner: '🎄 Merry Christmas! 🎄', accent: '#dc2626' },
  { m: 8, d: 15, name: 'Independence Day', bg: 'linear-gradient(135deg,#fff7ed 0%,#ffffff 50%,#ecfdf5 100%)', banner: '🇮🇳 Happy Independence Day 🇮🇳', accent: '#ea580c' },
  { m: 1, d: 26, name: 'Republic Day', bg: 'linear-gradient(135deg,#fff7ed 0%,#ffffff 50%,#ecfdf5 100%)', banner: '🇮🇳 Happy Republic Day 🇮🇳', accent: '#ea580c' },
  { m: 1, d: 1, name: 'New Year', bg: 'linear-gradient(135deg,#faf5ff 0%,#fef3c7 50%,#e0e7ff 100%)', banner: '🎉 Happy New Year! 🎉', accent: '#8b5cf6' },
]

function within1Day(y, mo, d, fm, fd) {
  const today = Date.UTC(y, mo - 1, d)
  const target = Date.UTC(y, fm - 1, fd)
  return Math.abs(Math.round((target - today) / 86400000)) <= 1
}

export function getSeasonalTheme(now = new Date()) {
  const { y, mo, d } = istParts(now)
  const hit = SEASONS.find((s) => within1Day(y, mo, d, s.m, s.d))
  return hit || DEFAULT
}
