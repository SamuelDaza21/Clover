import { useMemo, useState } from 'react'
import { Leaf, Droplets, Wind, TreePine, Check, X, Scale, Sparkles } from 'lucide-react'
import { cn } from '../lib/utils'

const alternatives = [
  { name: 'Clover', tag: 'App + kit + comunidad', pros: ['Impacto medible y verificable', 'Kit plantable con trazabilidad por lote', 'Comunidad local en Fusagasugá', 'Freemium sin barrera de entrada'], cons: [] },
  { name: 'Apps de hábitos (Forest, JouleBug)', tag: 'Solo software', pros: ['Gamificación probada'], cons: ['Sin kit físico ni siembra real', 'Sin comunidad local', 'Impacto no verificable'] },
  { name: 'Kits artesanales sueltos', tag: 'Solo físico', pros: ['Experiencia tangible'], cons: ['Sin seguimiento ni medición', 'Sin hábito sostenido', 'Sin comunidad ni recompensa'] },
  { name: 'Agenda / WhatsApp', tag: 'Recordatorio', pros: ['Ya está en el celular'], cons: ['Recuerda, no mide ni recompensa', 'Sin impacto real', 'Sin trazabilidad'] },
]

export function Impact() {
  const [kits, setKits] = useState(50)
  const [subs, setSubs] = useState(500)

  const calc = useMemo(() => {
    const hojas = kits * 20
    const co2 = Math.round(kits * 20 * 0.32 + subs * 0.18)
    const agua = Math.round(kits * 20 * 1.8)
    const arboles = (hojas / 45).toFixed(1)
    const residuos = Math.round(kits * 0.18)
    return { hojas, co2, agua, arboles, residuos }
  }, [kits, subs])

  return (
    <section id="impacto" className="relative overflow-hidden bg-clover-navy py-20 text-clover-paper sm:py-28">
      <div className="absolute inset-0 -z-0 opacity-30 grain" />
      <div className="absolute -top-40 right-0 h-96 w-96 rounded-full bg-clover-leaf/30 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-clover-gold/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-clover-gold">Módulo de impacto</p>
          <h2 className="mt-2 font-display text-4xl font-semibold sm:text-5xl">
            Por qué elegir Clover es una decisión inteligente y responsable
          </h2>
          <p className="mt-4 text-clover-paper/80">
            Calcula el impacto real de tu comunidad y compáralo con las alternativas. Clover no vende una app: convierte la intención en práctica sostenida, medible y verificable.
          </p>
        </div>

        {/* Calculator */}
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-8">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-clover-gold" />
              <h3 className="font-display text-2xl font-semibold">Calculadora de impacto</h3>
            </div>
            <p className="mt-2 text-sm text-clover-paper/70">Ajusta los valores y mira el impacto mensual estimado.</p>

            <div className="mt-6 space-y-6">
              <div>
                <div className="flex items-center justify-between text-sm">
                  <label htmlFor="kits" className="font-medium">Kits plantables distribuidos / mes</label>
                  <span className="font-display text-lg font-semibold text-clover-gold">{kits}</span>
                </div>
                <input
                  id="kits"
                  type="range"
                  min={0}
                  max={500}
                  step={5}
                  value={kits}
                  onChange={(e) => setKits(Number(e.target.value))}
                  className="mt-3 w-full accent-clover-gold"
                />
              </div>
              <div>
                <div className="flex items-center justify-between text-sm">
                  <label htmlFor="subs" className="font-medium">Suscriptores activos</label>
                  <span className="font-display text-lg font-semibold text-clover-gold">{subs}</span>
                </div>
                <input
                  id="subs"
                  type="range"
                  min={0}
                  max={2500}
                  step={25}
                  value={subs}
                  onChange={(e) => setSubs(Number(e.target.value))}
                  className="mt-3 w-full accent-clover-gold"
                />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { icon: Leaf, label: 'Hojas plantadas', value: calc.hojas.toLocaleString('es-CO') },
                { icon: Wind, label: 'CO₂ evitado (kg)', value: calc.co2.toLocaleString('es-CO') },
                { icon: Droplets, label: 'Agua ahorrada (L)', value: calc.agua.toLocaleString('es-CO') },
                { icon: TreePine, label: 'Árboles equiv.', value: calc.arboles },
              ].map((m) => (
                <div key={m.label} className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center">
                  <m.icon className="mx-auto h-4 w-4 text-clover-gold" />
                  <p className="mt-2 font-display text-lg font-semibold">{m.value}</p>
                  <p className="mt-1 text-[10px] leading-tight text-clover-paper/70">{m.label}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[11px] text-clover-paper/50">
              Estimación basada en 20 hojas por kit, trébol blanco (Trifolium repens) y hábitos registrados en la app.
            </p>
          </div>

          {/* Comparison */}
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-8">
            <div className="flex items-center gap-2">
              <Scale className="h-5 w-5 text-clover-gold" />
              <h3 className="font-display text-2xl font-semibold">Comparativa de valor</h3>
            </div>
            <p className="mt-2 text-sm text-clover-paper/70">Clover vs. las alternativas que hoy usan los jóvenes.</p>

            <div className="mt-6 space-y-4">
              {alternatives.map((a) => {
                const isClover = a.name === 'Clover'
                return (
                  <div
                    key={a.name}
                    className={cn(
                      'rounded-2xl border p-4 transition-all',
                      isClover
                        ? 'border-clover-gold/60 bg-clover-gold/10 shadow-soft'
                        : 'border-white/10 bg-white/5'
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-display text-lg font-semibold">{a.name}</p>
                        <p className="text-xs text-clover-paper/60">{a.tag}</p>
                      </div>
                      {isClover && (
                        <span className="rounded-full bg-clover-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-clover-navy">
                          Recomendado
                        </span>
                      )}
                    </div>
                    <ul className="mt-3 space-y-1.5">
                      {a.pros.map((p) => (
                        <li key={p} className="flex items-start gap-2 text-xs text-clover-paper/90">
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-clover-gold" />
                          <span>{p}</span>
                        </li>
                      ))}
                      {a.cons.map((c) => (
                        <li key={c} className="flex items-start gap-2 text-xs text-clover-paper/60">
                          <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-300" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}