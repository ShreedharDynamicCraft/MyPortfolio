import {
  defaultData,
  defaultProfile,
  defaultExperiences,
  defaultEducation,
  defaultProjects,
  defaultTechStacks,
  defaultAchievements,
  defaultSocials,
} from '../data/defaults'

const STORAGE_KEY = 'portfolio.data.v1'

const DEFAULT_PW_HASH = '2d8xy2g0qxn'

function cyrb53(str, seed = 0) {
  let h1 = 0xdeadbeef ^ seed
  let h2 = 0x41c6ce57 ^ seed
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i)
    h1 = Math.imul(h1 ^ ch, 2654435761)
    h2 = Math.imul(h2 ^ ch, 1597334677)
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909)
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909)
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36)
}

function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

function readOverrides() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function loadData() {
  const stored = readOverrides()
  if (!stored) return clone(defaultData)

  const storedProfile = stored.profile || {}
  return {
    profile: {
      ...defaultProfile,
      ...storedProfile,
      links: { ...defaultProfile.links, ...(storedProfile.links || {}) },
    },
    experiences: stored.experiences ?? clone(defaultExperiences),
    education: stored.education ?? clone(defaultEducation),
    projects: stored.projects ?? clone(defaultProjects),
    techStacks: stored.techStacks ?? clone(defaultTechStacks),
    achievements: stored.achievements ?? clone(defaultAchievements),
    socials: stored.socials ?? clone(defaultSocials),
  }
}

export function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function resetData() {
  localStorage.removeItem(STORAGE_KEY)
  return clone(defaultData)
}

export function hasOverrides() {
  return readOverrides() !== null
}

export function exportData(data) {
  return JSON.stringify(data, null, 2)
}

export function parseImport(jsonString) {
  const parsed = JSON.parse(jsonString)
  if (!parsed || typeof parsed !== 'object' || !parsed.profile) {
    throw new Error('Invalid profile file: missing "profile".')
  }
  return parsed
}

export function checkPassword(input) {
  const env = import.meta.env.VITE_EDIT_PASSWORD
  if (env) return input === env
  return cyrb53(input) === DEFAULT_PW_HASH
}
