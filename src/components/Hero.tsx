import { motion } from 'framer-motion'
import { ArrowRight, Play, Sprout, Users, Recycle, TrendingUp } from 'lucide-react'

const metrics = [
  { label: 'Mercado disponible (SAM)', value: '8.012', hint: 'jóvenes en Fusagasugá', icon: Users },
  { label: 'Disposición a pagar', value: '91,9%', hint: 'pagaría por la suscripción', icon: TrendingUp },
  { label: 'VAN del proyecto', value: '$64,0 M', hint: 'pesos colombianos 2026', icon: Recycle },
]

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 grain">
        <div className="absolute -top-32 -right-24 h-[520px] w-[520px] rounded-full bg-clover-mint/60 blur-3xl" />
        <div className="absolute bottom-0 -left-32 h-[420px] w-[420px] rounded-full bg-clover-gold/20 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex flex-col justify-center"
        >
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-clover-line bg-white px-3 py-1 text-xs font-semibold uppercase tracking-widest text-clover-deep">
            <Sprout className="h-3.5 w-3.5" />
            Emprendimiento verde · Fusagasugá, Cundinamarca
          </span>

          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] text-clover-navy sm:text-6xl lg:text-7xl">
            Convierte la intención ambiental en un <span className="text-clover-leaf">hábito que florece</span>.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-clover-gray">
            Clover une una <strong className="font-semibold text-clover-ink">app web gamificada</strong>, un{' '}
            <strong className="font-semibold text-clover-ink">kit de papel plantable con semillas de trébol blanco</strong>{' '}
            y una comunidad local para que jóvenes, universidades y empresas pasen de saber a hacer, con impacto medible y verificable.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#catalogo"
              className="group inline-flex items-center gap-2 rounded-full bg-clover-deep px-6 py-3.5 text-sm font-semibold text-clover-paper shadow-lift transition-transform hover:-translate-y-0.5"
            >
              Explorar planes y kits
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#impacto"
              className="inline-flex items-center gap-2 rounded-full border border-clover-line bg-white px-6 py-3.5 text-sm font-semibold text-clover-navy transition-colors hover:border-clover-deep hover:text-clover-deep"
            >
              <Play className="h-4 w-4" />
              Ver impacto real
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-6 text-xs text-clover-gray">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-clover-leaf" /> Freemium sin costo
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-clover-gold" /> Kit plantable certificado ICA
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-clover-teal" /> Impacto verificable
            </div>
          </div>
        </motion.div>

        {/* Interactive metrics card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-clover-mint via-transparent to-clover-gold/30 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-clover-line bg-white p-6 shadow-card sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-clover-gray">Panel de impacto</p>
                <p className="mt-1 font-display text-2xl font-semibold text-clover-navy">Clover · 2031</p>
              </div>
              <span className="rounded-full bg-clover-mint px-3 py-1 text-xs font-semibold text-clover-deep">
                Proyección verificada
              </span>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {metrics.map((m) => (
                <div
                  key={m.label}
                  className="group rounded-2xl border border-clover-line bg-clover-paper p-4 transition-all hover:-translate-y-1 hover:border-clover-leaf hover:shadow-soft"
                >
                  <div className="flex items-center justify-between">
                    <m.icon className="h-4 w-4 text-clover-leaf" />
                    <span className="text-[10px] font-medium text-clover-gray">{m.hint}</span>
                  </div>
                  <p className="mt-3 font-display text-2xl font-semibold text-clover-navy">{m.value}</p>
                  <p className="mt-1 text-xs leading-snug text-clover-gray">{m.label}</p>
                </div>
              ))}
            </div>

            {/* Growth bar */}
            <div className="mt-6 rounded-2xl border border-clover-line bg-clover-paper p-4">
              <div className="flex items-center justify-between text-xs font-medium text-clover-gray">
                <span>Suscriptores 2027 → 2031</span>
                <span className="text-clover-deep">154 → 2.549</span>
              </div>
              <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-clover-line">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.4, delay: 0.6, ease: 'easeOut' }}
                  className="h-full rounded-full bg-gradient-to-r from-clover-leaf via-clover-teal to-clover-gold"
                />
              </div>
              <p className="mt-3 text-xs text-clover-gray">
                EBITDA positivo desde 2028 · utilidad neta de $139,5 M en 2031 · equilibrio con 112 suscriptores/mes.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}