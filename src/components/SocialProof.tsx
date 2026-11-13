import { Quote, ShieldCheck, Leaf, GraduationCap, Award, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'

const badges = [
  { icon: ShieldCheck, label: 'Semillas certificadas ICA', hint: 'Resolución 3168 de 2015' },
  { icon: Leaf, label: 'Papel 100% reciclado', hint: 'Cortado a mano, tinta a base de agua' },
  { icon: Award, label: 'Trazabilidad por lote', hint: 'Prueba de germinación por lote' },
  { icon: CheckCircle2, label: 'Datos protegidos', hint: 'Ley 1581 de 2012' },
  { icon: GraduationCap, label: 'Alianza universitaria', hint: 'Universidad de Cundinamarca' },
]

const testimonials = [
  {
    quote:
      'Clover me ayudó a pasar de “sé que debo reciclar” a hacerlo todos los días. El kit en mi escritorio me recuerda que cada hoja se siembra.',
    name: 'María Fernanda Rojas',
    role: 'Estudiante de Ingeniería Ambiental · U. de Cundinamarca',
    initials: 'MR',
    metric: '+18 hábitos en 30 días',
  },
  {
    quote:
      'Implementamos Clover como política de bienestar. El panel de impacto nos dio números reales para el informe de sostenibilidad.',
    name: 'Carlos Andrés Mejía',
    role: 'Coordinador de Talento Humano · Empresa local',
    initials: 'CM',
    metric: '42 empleados activos',
  },
  {
    quote:
      'El kit plantable fue el regalo corporativo con más sentido que hemos dado. Los clientes lo sembraron y nos enviaron fotos.',
    name: 'Laura Valentina Torres',
    role: 'Directora de Marketing · Startup regional',
    initials: 'LT',
    metric: '300 kits distribuidos',
  },
]

const allies = ['Universidad de Cundinamarca', 'Alcaldía de Fusagasugá', 'Fondo Emprender', 'EcoTiendas Fusagasugá', 'Comunidad Clover']

export function SocialProof() {
  return (
    <section id="casos" className="bg-clover-sand py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-clover-leaf">Prueba social y alianzas</p>
          <h2 className="mt-2 font-display text-4xl font-semibold text-clover-navy sm:text-5xl">
            Casos reales, impacto verificable
          </h2>
          <p className="mt-4 text-clover-gray">
            Estudiantes, empresas e instituciones ya convierten la intención en práctica sostenida con Clover. Esto es lo que dicen.
          </p>
        </div>

        {/* Trust badges */}
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {badges.map((b) => (
            <div
              key={b.label}
              className="flex items-center gap-3 rounded-2xl border border-clover-line bg-white p-4 shadow-card transition-all hover:-translate-y-0.5 hover:border-clover-leaf"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-clover-mint text-clover-deep">
                <b.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-clover-navy">{b.label}</p>
                <p className="text-[11px] text-clover-gray">{b.hint}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative flex flex-col rounded-[1.5rem] border border-clover-line bg-white p-6 shadow-card"
            >
              <Quote className="h-7 w-7 text-clover-gold" />
              <p className="mt-4 flex-1 text-sm leading-relaxed text-clover-ink">“{t.quote}”</p>
              <div className="mt-6 flex items-center gap-3 border-t border-clover-line pt-4">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-clover-deep font-display text-sm font-semibold text-clover-paper">
                  {t.initials}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-clover-navy">{t.name}</p>
                  <p className="text-[11px] text-clover-gray">{t.role}</p>
                </div>
                <span className="rounded-full bg-clover-mint px-2.5 py-1 text-[10px] font-bold text-clover-deep">
                  {t.metric}
                </span>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Case study highlight */}
        <div className="mt-12 overflow-hidden rounded-[2rem] border border-clover-line bg-white shadow-card">
          <div className="grid gap-0 lg:grid-cols-2">
            <div className="bg-gradient-to-br from-clover-deep to-clover-teal p-8 text-clover-paper sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-clover-gold">Caso de éxito</p>
              <h3 className="mt-2 font-display text-3xl font-semibold">Piloto en la Universidad de Cundinamarca</h3>
              <p className="mt-4 text-sm leading-relaxed text-clover-paper/90">
                30 días, 30 estudiantes, un reto semanal y un kit plantable por participante. Medimos retención, hábitos registrados e impacto.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-4">
                {[
                  { v: '86%', l: 'retención' },
                  { v: '412', l: 'hábitos registrados' },
                  { v: '600', l: 'hojas sembradas' },
                ].map((m) => (
                  <div key={m.l} className="rounded-xl bg-white/10 p-3 text-center">
                    <p className="font-display text-2xl font-semibold text-clover-gold">{m.v}</p>
                    <p className="mt-1 text-[11px] text-clover-paper/80">{m.l}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-8 sm:p-10">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-clover-deep">Alianzas y aliados</h4>
              <p className="mt-3 text-sm text-clover-gray">
                Construimos Clover con actores locales: universidad, municipio, proveedores certificados y la comunidad.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {allies.map((a) => (
                  <span
                    key={a}
                    className="rounded-full border border-clover-line bg-clover-paper px-3 py-1.5 text-xs font-medium text-clover-navy"
                  >
                    {a}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#cotizador"
                  className="inline-flex items-center gap-2 rounded-full bg-clover-deep px-5 py-3 text-sm font-semibold text-clover-paper shadow-soft transition-transform hover:-translate-y-0.5"
                >
                  Ser aliado institucional
                </a>
                <a
                  href="#catalogo"
                  className="inline-flex items-center gap-2 rounded-full border border-clover-line bg-white px-5 py-3 text-sm font-semibold text-clover-navy transition-colors hover:border-clover-deep hover:text-clover-deep"
                >
                  Ver planes
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}