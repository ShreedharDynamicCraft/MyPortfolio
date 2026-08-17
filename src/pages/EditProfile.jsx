import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Download, Upload, RotateCcw, ExternalLink, Lock, LogOut, Save } from 'lucide-react'
import { useProfile } from '../lib/ProfileContext'
import { checkPassword, exportData, parseImport, hasOverrides } from '../lib/profileStore'
import { listSections } from '../data/adminSchema'
import SectionEditor from '../components/admin/SectionEditor'
import { TextField, TextArea, TagInput, Toggle } from '../components/admin/AdminFields'

const AUTH_KEY = 'portfolio.admin.authed'

function Gate({ onUnlock }) {
  const [pw, setPw] = useState('')
  const [error, setError] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (checkPassword(pw)) {
      sessionStorage.setItem(AUTH_KEY, '1')
      onUnlock()
    } else {
      setError(true)
    }
  }

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4">
      <form onSubmit={submit} className="w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-white/60 p-8 text-center">
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-brand to-purple-600 grid place-items-center">
          <Lock className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-ink mb-1">Edit Profile</h1>
        <p className="text-sm text-gray-500 mb-6">Enter your admin password to manage your portfolio content.</p>
        <input
          type="password"
          autoFocus
          value={pw}
          onChange={(e) => {
            setPw(e.target.value)
            setError(false)
          }}
          placeholder="Password"
          className={`w-full px-4 py-3 rounded-xl border ${error ? 'border-red-400' : 'border-gray-300'} focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none mb-2`}
        />
        {error && <p className="text-sm text-red-500 mb-2">Incorrect password.</p>}
        <button type="submit" className="w-full mt-2 px-4 py-3 rounded-xl bg-brand text-white font-semibold hover:bg-brand-dark transition">
          Unlock
        </button>
        <Link to="/" className="block mt-4 text-sm text-gray-500 hover:text-brand">← Back to site</Link>
      </form>
    </div>
  )
}

function ProfileEditor() {
  const { data, setProfile, setLinks } = useProfile()
  const p = data.profile
  const links = p.links || {}

  return (
    <div>
      <h2 className="text-xl font-bold text-ink mb-5">Profile</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label="Name" value={p.name} onChange={(v) => setProfile({ name: v })} />
        <TextField label="Headline" value={p.headline} onChange={(v) => setProfile({ headline: v })} />
        <div className="sm:col-span-2">
          <TagInput label="Roles (typewriter cycles these)" value={p.roles || []} onChange={(v) => setProfile({ roles: v })} />
        </div>
        <div className="sm:col-span-2">
          <TextArea label="About" value={p.about} onChange={(v) => setProfile({ about: v })} rows={3} />
        </div>
        <TextField label="Email" value={p.email} onChange={(v) => setProfile({ email: v })} />
        <TextField label="Phone" value={p.phone} onChange={(v) => setProfile({ phone: v })} />
        <TextField label="Location" value={p.location} onChange={(v) => setProfile({ location: v })} />
        <TextField label="Hero image URL" value={p.heroImage} onChange={(v) => setProfile({ heroImage: v })} />
        <Toggle label="Available for work" value={p.availableForWork} onChange={(v) => setProfile({ availableForWork: v })} />
      </div>

      <h3 className="text-lg font-bold text-ink mt-8 mb-4">Links</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label="Portfolio URL (hosted)" value={links.portfolio} onChange={(v) => setLinks({ portfolio: v })} />
        <TextField label="Resume URL" value={links.resume} onChange={(v) => setLinks({ resume: v })} />
        <TextField label="GitHub" value={links.github} onChange={(v) => setLinks({ github: v })} />
        <TextField label="LinkedIn" value={links.linkedin} onChange={(v) => setLinks({ linkedin: v })} />
        <TextField label="Twitter / X" value={links.twitter} onChange={(v) => setLinks({ twitter: v })} />
        <TextField label="Instagram" value={links.instagram} onChange={(v) => setLinks({ instagram: v })} />
        <TextField label="LeetCode" value={links.leetcode} onChange={(v) => setLinks({ leetcode: v })} />
      </div>
    </div>
  )
}

export default function EditProfile() {
  const { data, replaceAll, reset } = useProfile()
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(AUTH_KEY) === '1')
  const [tab, setTab] = useState('profile')
  const [toast, setToast] = useState('')
  const fileRef = useRef(null)

  if (!authed) return <Gate onUnlock={() => setAuthed(true)} />

  const flash = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 2500)
  }

  const handleExport = () => {
    const blob = new Blob([exportData(data)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'portfolio-content.json'
    a.click()
    URL.revokeObjectURL(url)
    flash('Exported portfolio-content.json')
  }

  const handleImport = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = parseImport(String(reader.result))
        replaceAll(parsed)
        flash('Imported successfully')
      } catch (err) {
        flash(`Import failed: ${err.message}`)
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  const handleReset = () => {
    if (window.confirm('Reset ALL content back to the built-in defaults? Your local edits will be lost.')) {
      reset()
      flash('Reset to defaults')
    }
  }

  const tabs = [{ key: 'profile', label: 'Profile' }, ...listSections.map((s) => ({ key: s.key, label: s.label }))]

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <span className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand to-purple-600 grid place-items-center text-white font-bold shrink-0">
              {(data.profile.name || 'S').charAt(0)}
            </span>
            <div className="min-w-0">
              <h1 className="font-bold text-ink leading-tight truncate">Edit Profile</h1>
              <p className="text-xs text-gray-500 truncate">Changes save to this browser automatically</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/" target="_blank" className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 text-sm font-semibold hover:bg-gray-50">
              <ExternalLink className="w-4 h-4" /> View site
            </Link>
            <button
              onClick={() => {
                sessionStorage.removeItem(AUTH_KEY)
                setAuthed(false)
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 text-sm font-semibold hover:bg-gray-50"
            >
              <LogOut className="w-4 h-4" /> Lock
            </button>
          </div>
        </div>
      </header>

      <div className="bg-brand/5 border-b border-brand/10">
        <div className="max-w-6xl mx-auto px-4 py-2.5 flex flex-wrap items-center gap-2 text-sm">
          <Save className="w-4 h-4 text-brand" />
          <span className="text-gray-600 mr-auto">
            To publish edits for everyone, <strong>Export</strong> the JSON and commit it to your repo.
          </span>
          <button onClick={handleExport} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-gray-200 font-semibold hover:bg-gray-50">
            <Download className="w-4 h-4" /> Export
          </button>
          <button onClick={() => fileRef.current?.click()} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-gray-200 font-semibold hover:bg-gray-50">
            <Upload className="w-4 h-4" /> Import
          </button>
          <input ref={fileRef} type="file" accept="application/json" className="hidden" onChange={handleImport} />
          <button onClick={handleReset} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-gray-200 font-semibold text-red-600 hover:bg-red-50">
            <RotateCcw className="w-4 h-4" /> Reset
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 grid gap-6 md:grid-cols-[200px_1fr]">
        <nav className="md:sticky md:top-24 self-start flex md:flex-col gap-1 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-2.5 rounded-xl text-left text-sm font-semibold whitespace-nowrap transition ${
                tab === t.key ? 'bg-brand text-white shadow' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {t.label}
            </button>
          ))}
          {hasOverrides() && <span className="hidden md:block mt-3 px-4 text-xs text-gray-400">Local edits active</span>}
        </nav>

        <div className="bg-white rounded-3xl border border-gray-200 p-5 md:p-7 shadow-sm">
          {tab === 'profile' ? (
            <ProfileEditor />
          ) : (
            <SectionEditor section={listSections.find((s) => s.key === tab)} />
          )}
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl bg-ink text-white text-sm shadow-2xl animate-fadeIn">
          {toast}
        </div>
      )}
    </div>
  )
}
