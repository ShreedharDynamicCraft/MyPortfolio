import { useSeason } from '../../lib/useSeason'
import AnalogClock from './AnalogClock'

export default function GreetingClock() {
  const { now, greeting } = useSeason()

  const f = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
  const p = Object.fromEntries(f.formatToParts(now).map((x) => [x.type, x.value]))
  const h = +p.hour % 24
  const m = +p.minute
  const s = +p.second

  const time = now.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' })
  const [hm, ap] = time.split(' ')
  const date = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'Asia/Kolkata' })

  return (
    <div className="inline-block rounded-2xl p-[1.5px] bg-gradient-to-r from-brand via-fuchsia-500 to-pink-500 shadow-lg shadow-brand/20">
      <div className="flex items-center gap-4 rounded-2xl bg-white/85 backdrop-blur-xl pl-3 pr-6 py-2.5">
        <div className="shrink-0 p-[2px] rounded-full bg-gradient-to-br from-brand via-fuchsia-500 to-pink-500">
          <div className="rounded-full bg-white p-0.5">
            <AnalogClock h={h} m={m} s={s} size={52} />
          </div>
        </div>

        <div className="leading-tight text-left">
          <div className="flex items-center gap-1.5 text-sm font-bold">
            <span>{greeting.emoji}</span>
            <span className="bg-gradient-to-r from-brand to-pink-500 bg-clip-text text-transparent">{greeting.text}</span>
          </div>
          <div className="font-mono tabular-nums font-black text-2xl tracking-tight text-ink mt-0.5">
            {hm}
            <span className="text-xs font-bold text-brand ml-1 align-top">{ap}</span>
          </div>
          <div className="text-[11px] text-gray-500 tracking-wide font-medium">{date} · IST</div>
        </div>
      </div>
    </div>
  )
}
