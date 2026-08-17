import { useState } from 'react'
import { X } from 'lucide-react'

const labelCls = 'block text-sm font-semibold text-gray-700 mb-1.5'
const inputCls =
  'w-full px-3.5 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition'

export function TextField({ label, value, onChange, placeholder, type = 'text' }) {
  return (
    <label className="block">
      <span className={labelCls}>{label}</span>
      <input
        type={type}
        className={inputCls}
        value={value ?? ''}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  )
}

export function TextArea({ label, value, onChange, rows = 4, placeholder }) {
  return (
    <label className="block">
      <span className={labelCls}>{label}</span>
      <textarea
        className={`${inputCls} resize-y`}
        rows={rows}
        value={value ?? ''}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  )
}

export function Select({ label, value, onChange, options }) {
  return (
    <label className="block">
      <span className={labelCls}>{label}</span>
      <select className={inputCls} value={value ?? ''} onChange={(e) => onChange(e.target.value)}>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  )
}

export function Toggle({ label, value, onChange }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer py-1.5">
      <span
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${value ? 'bg-brand' : 'bg-gray-300'}`}
        onClick={() => onChange(!value)}
      >
        <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${value ? 'translate-x-5' : 'translate-x-0.5'}`} />
      </span>
      <span className="text-sm font-semibold text-gray-700">{label}</span>
    </label>
  )
}

export function TagInput({ label, value = [], onChange, placeholder = 'Type and press Enter' }) {
  const [draft, setDraft] = useState('')

  const add = () => {
    const t = draft.trim()
    if (t && !value.includes(t)) onChange([...value, t])
    setDraft('')
  }

  return (
    <div>
      <span className={labelCls}>{label}</span>
      <div className="flex flex-wrap gap-2 mb-2">
        {value.map((tag) => (
          <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-brand/10 text-brand text-sm font-medium">
            {tag}
            <button type="button" onClick={() => onChange(value.filter((t) => t !== tag))} aria-label={`Remove ${tag}`}>
              <X className="w-3.5 h-3.5" />
            </button>
          </span>
        ))}
      </div>
      <input
        className={inputCls}
        value={draft}
        placeholder={placeholder}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault()
            add()
          }
        }}
        onBlur={add}
      />
    </div>
  )
}

export function SchemaField({ field, value, onChange }) {
  switch (field.type) {
    case 'textarea':
      return <TextArea label={field.label} value={value} onChange={onChange} placeholder={field.placeholder} />
    case 'tags':
      return <TagInput label={field.label} value={value || []} onChange={onChange} />
    case 'lines':
      return (
        <TextArea
          label={field.label}
          value={(value || []).join('\n')}
          onChange={(v) => onChange(v.split('\n'))}
          rows={5}
          placeholder="One bullet per line"
        />
      )
    case 'select':
      return <Select label={field.label} value={value} onChange={onChange} options={field.options} />
    case 'toggle':
      return <Toggle label={field.label} value={!!value} onChange={onChange} />
    default:
      return <TextField label={field.label} value={value} onChange={onChange} placeholder={field.placeholder} />
  }
}
