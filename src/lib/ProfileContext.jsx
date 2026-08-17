import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { loadData, saveData, resetData } from './profileStore'

const ProfileContext = createContext(null)

export function ProfileProvider({ children }) {
  const [data, setData] = useState(() => loadData())

  const commit = useCallback((updater) => {
    setData((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      saveData(next)
      return next
    })
  }, [])

  const api = useMemo(
    () => ({
      setProfile: (patch) =>
        commit((prev) => ({ ...prev, profile: { ...prev.profile, ...patch } })),

      setLinks: (patch) =>
        commit((prev) => ({
          ...prev,
          profile: { ...prev.profile, links: { ...prev.profile.links, ...patch } },
        })),

      addItem: (section, item) =>
        commit((prev) => ({ ...prev, [section]: [...prev[section], item] })),

      updateItem: (section, id, patch) =>
        commit((prev) => ({
          ...prev,
          [section]: prev[section].map((it) => (it.id === id ? { ...it, ...patch } : it)),
        })),

      removeItem: (section, id) =>
        commit((prev) => ({
          ...prev,
          [section]: prev[section].filter((it) => it.id !== id),
        })),

      moveItem: (section, id, direction) =>
        commit((prev) => {
          const list = [...prev[section]]
          const i = list.findIndex((it) => it.id === id)
          const j = direction === 'up' ? i - 1 : i + 1
          if (i < 0 || j < 0 || j >= list.length) return prev
          ;[list[i], list[j]] = [list[j], list[i]]
          return { ...prev, [section]: list }
        }),

      replaceAll: (next) => commit(next),
      reset: () => commit(resetData()),
    }),
    [commit],
  )

  const value = useMemo(() => ({ data, ...api }), [data, api])
  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
}

export function useProfile() {
  const ctx = useContext(ProfileContext)
  if (!ctx) throw new Error('useProfile must be used within a ProfileProvider')
  return ctx
}
