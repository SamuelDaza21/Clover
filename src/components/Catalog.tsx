import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Filter, Plus, X, Check, Leaf, Package, Building2, Sprout } from 'lucide-react'
import { categories, products, type Product, formatCOP } from '../data/products'
import { cn } from '../lib/utils'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  sprout: Sprout,
  leaf: Leaf,
  tree: Sprout,
  package: Package,
  building: Building2,
}

const accentBg: Record<Product['accent'], string> = {
  deep: 'from-clover-deep to-clover-leaf',
  leaf: 'from-clover-leaf to-clover-teal',
  teal: 'from-clover-teal to-clover-deep',
  gold: 'from-clover-gold to-clover-leaf',
}

interface CatalogProps {
  search: string
  onAddToCart: (p: Product, qty: number) => void
}

export function Catalog({ search, onAddToCart }: CatalogProps) {
  const [active, setActive] = useState<Product['category'] | 'all'>('all')
  const [selected, setSelected] = useState<Product | null>(null)

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return products.filter((p) => {
      const catOk = active === 'all' || p.category === active
      const text = `${p.name} ${p.tagline} ${p.description} ${p.features.join(' ')}`.toLowerCase()
      const qOk = !q || text.includes(q)
      return catOk && qOk
    })
  }, [active, search])

  return (
    <section id="catalogo" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-clover-leaf">Catálogo comercial</p>
            <h2 className="mt-2 font-display text-4xl font-semibold text-clover-navy sm:text-5xl">
              Planes y kit, listos para cotizar
            </h2>
            <p className="mt-3 max-w-xl text-clover-gray">
              Elige el plan que encaja con tu ritmo. Cada opción incluye impacto medible y, cuando aplica, el kit plantable con trazabilidad por lote.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-clover-gray">
            <Filter className="h-4 w-4" />
            <span>{filtered.length} de {products.length} opciones</span>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={cn(
                'group rounded-full border px-4 py-2 text-sm font-medium transition-all',
                active === c.id
                  ? 'border-clover-deep bg-clover-deep text-clover-paper shadow-soft'
                  : 'border-clover-line bg-white text-clover-ink hover:border-clover-leaf hover:text-clover-deep'
              )}
            >
              <span className="block">{c.label}</span>
              <span className={cn('block text-[10px] font-normal', active === c.id ? 'text-clover-paper/70' : 'text-clover-gray')}>
                {c.hint}
              </span>
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => {
            const Icon = iconMap[p.icon] ?? Leaf
            return (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="group relative flex flex-col overflow-hidden rounded-[1.5rem] border border-clover-line bg-white shadow-card transition-all hover:-translate-y-1.5 hover:shadow-lift"
              >
                <div className={`relative h-32 bg-gradient-to-br ${accentBg[p.accent]} p-5 text-white`}>
                  <div className="absolute inset-0 opacity-20 grain" />
                  <div className="relative flex items-start justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/20 backdrop-blur">
                      <Icon className="h-5 w-5" />
                    </span>
                    {p.badge && (
                      <span className="rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-clover-navy">
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <p className="relative mt-4 font-display text-xl font-semibold">{p.name}</p>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <p className="text-sm font-medium text-clover-deep">{p.tagline}</p>
                  <p className="mt-2 text-sm leading-relaxed text-clover-gray line-clamp-2">{p.description}</p>

                  <ul className="mt-4 space-y-1.5">
                    {p.features.slice(0, 3).map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs text-clover-ink">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-clover-leaf" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex items-center justify-between pt-5">
                    <div>
                      <p className="text-xs text-clover-gray">Desde</p>
                      <p className="font-display text-lg font-semibold text-clover-navy">{formatCOP(p.price)}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelected(p)}
                        className="rounded-full border border-clover-line px-3 py-2 text-xs font-semibold text-clover-navy transition-colors hover:border-clover-deep hover:text-clover-deep"
                      >
                        Detalle
                      </button>
                      <button
                        onClick={() => onAddToCart(p, 1)}
                        className="grid h-9 w-9 place-items-center rounded-full bg-clover-deep text-clover-paper transition-transform hover:scale-105"
                        aria-label={`Agregar ${p.name}`}
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>

        {filtered.length === 0 && (
          <div className="mt-12 rounded-2xl border border-dashed border-clover-line bg-white p-10 text-center">
            <p className="font-display text-xl text-clover-navy">Sin resultados</p>
            <p className="mt-2 text-sm text-clover-gray">Prueba con otro término o cambia la categoría.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-items-center bg-clover-navy/60 p-4 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] bg-white shadow-lift"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-clover-paper text-clover-gray transition-colors hover:text-clover-deep"
                aria-label="Cerrar"
              >
                <X className="h-4 w-4" />
              </button>

              <div className={`relative h-40 bg-gradient-to-br ${accentBg[selected.accent]} p-6 text-white`}>
                <div className="absolute inset-0 opacity-20 grain" />
                <div className="relative">
                  <p className="text-xs font-semibold uppercase tracking-widest text-white/80">{selected.category}</p>
                  <h3 className="mt-2 font-display text-3xl font-semibold">{selected.name}</h3>
                  <p className="mt-1 text-sm text-white/90">{selected.tagline}</p>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <p className="text-clover-gray">{selected.description}</p>

                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-widest text-clover-deep">Incluye</h4>
                    <ul className="mt-3 space-y-2">
                      {selected.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-clover-ink">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-clover-leaf" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-widest text-clover-gold">Beneficio sostenible</h4>
                    <ul className="mt-3 space-y-2">
                      {selected.sustainable.map((s) => (
                        <li key={s} className="flex items-start gap-2 text-sm text-clover-ink">
                          <Leaf className="mt-0.5 h-4 w-4 shrink-0 text-clover-leaf" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-clover-line pt-6">
                  <div>
                    <p className="text-xs text-clover-gray">Precio</p>
                    <p className="font-display text-2xl font-semibold text-clover-navy">{formatCOP(selected.price)}</p>
                  </div>
                  <button
                    onClick={() => {
                      onAddToCart(selected, 1)
                      setSelected(null)
                    }}
                    className="inline-flex items-center gap-2 rounded-full bg-clover-deep px-6 py-3 text-sm font-semibold text-clover-paper shadow-soft transition-transform hover:-translate-y-0.5"
                  >
                    Agregar a cotización
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}