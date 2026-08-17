import { useState } from 'react'
import { ChevronDown, ChevronUp, Trash2, Plus, ArrowUp, ArrowDown } from 'lucide-react'
import { useProfile } from '../../lib/ProfileContext'
import { SchemaField } from './AdminFields'

export default function SectionEditor({ section }) {
  const { data, addItem, updateItem, removeItem, moveItem } = useProfile()
  const items = data[section.key] || []
  const [openId, setOpenId] = useState(null)

  const handleAdd = () => {
    const item = section.template()
    addItem(section.key, item)
    setOpenId(item.id)
  }

  const handleDelete = (item) => {
    const label = item[section.titleField] || section.singular
    if (window.confirm(`Delete "${label}"? This can't be undone (unless you re-import a backup).`)) {
      removeItem(section.key, item.id)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-bold text-ink">{section.label}</h2>
          <p className="text-sm text-gray-500">{items.length} item{items.length === 1 ? '' : 's'}</p>
        </div>
        <button
          onClick={handleAdd}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand text-white font-semibold hover:bg-brand-dark transition shadow"
        >
          <Plus className="w-4 h-4" /> Add {section.singular}
        </button>
      </div>

      <div className="space-y-3">
        {items.length === 0 && (
          <p className="text-sm text-gray-400 italic py-6 text-center border border-dashed border-gray-200 rounded-xl">
            No {section.label.toLowerCase()} yet — click “Add {section.singular}”.
          </p>
        )}

        {items.map((item, index) => {
          const open = openId === item.id
          return (
            <div key={item.id} className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3">
                <button
                  className="flex-1 flex items-center gap-2 text-left min-w-0"
                  onClick={() => setOpenId(open ? null : item.id)}
                >
                  {open ? <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />}
                  <span className="min-w-0">
                    <span className="block font-semibold text-ink truncate">
                      {item[section.titleField] || <em className="text-gray-400">Untitled</em>}
                    </span>
                    {section.subtitleField && item[section.subtitleField] && (
                      <span className="block text-xs text-gray-500 truncate">{item[section.subtitleField]}</span>
                    )}
                  </span>
                </button>

                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => moveItem(section.key, item.id, 'up')} disabled={index === 0} className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30" aria-label="Move up">
                    <ArrowUp className="w-4 h-4 text-gray-500" />
                  </button>
                  <button onClick={() => moveItem(section.key, item.id, 'down')} disabled={index === items.length - 1} className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30" aria-label="Move down">
                    <ArrowDown className="w-4 h-4 text-gray-500" />
                  </button>
                  <button onClick={() => handleDelete(item)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500" aria-label="Delete">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {open && (
                <div className="px-4 pb-5 pt-1 grid gap-4 sm:grid-cols-2 border-t border-gray-100">
                  {section.fields.map((field) => (
                    <div key={field.key} className={['textarea', 'tags', 'lines'].includes(field.type) ? 'sm:col-span-2' : ''}>
                      <SchemaField
                        field={field}
                        value={item[field.key]}
                        onChange={(val) => updateItem(section.key, item.id, { [field.key]: val })}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
