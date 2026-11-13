import { useState } from 'react'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Catalog } from './components/Catalog'
import { Impact } from './components/Impact'
import { SocialProof } from './components/SocialProof'
import { CartDrawer, type CartItem } from './components/CartDrawer'
import { ChevronDown, Mail, MapPin, Phone, Send } from 'lucide-react'
import { type Product } from './data/products'
import { cn } from './lib/utils'

const faqs = [
  {
    q: '¿Qué incluye el Plan Semilla gratuito?',
    a: 'Retos diarios y semanales, registro de impacto personal y acceso a la comunidad Clover, con hasta 3 retos activos. Es la puerta de entrada para que el hábito florezca sin costo.',
  },
  {
    q: '¿Cómo funciona el kit plantable?',
    a: 'Cada una de las 20 hojas de papel reciclado (14 × 20 cm) contiene semillas de trébol blanco (Trifolium repens). Se siembra siguiendo la guía ilustrada y, con agua y luz, germina en pocos días. El sustrato de fibra de coco viene incluido.',
  },
  {
    q: '¿El impacto que muestra la app es real?',
    a: 'Sí. Clover mide hábitos registrados, kits sembrados y acciones verificadas por lote. El panel muestra CO₂ evitado, agua ahorrada y árboles equivalentes, y es auditable por la empresa o institución.',
  },
  {
    q: '¿Puedo contratar Clover para mi empresa o universidad?',
    a: 'Sí. El Plan Empresa cuesta $6.000 por empleado al mes e incluye panel de impacto agregado, retos por equipos, reporte ESG descargable y acompañamiento de implementación.',
  },
  {
    q: '¿Las semillas cumplen la normativa ICA?',
    a: 'Sí. Trabajamos con proveedor certificado y realizamos prueba de germinación por lote, cumpliendo la Resolución 3168 de 2015 y las normas sanitarias del ICA.',
  },
]

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const cartCount = cart.reduce((s, i) => s + i.qty, 0)

  const addToCart = (product: Product, qty: number) => {
    setCart((prev) => {
      const found = prev.find((i) => i.product.id === product.id)
      if (found) {
        return prev.map((i) => (i.product.id === product.id ? { ...i, qty: i.qty + qty } : i))
      }
      return [...prev, { product, qty }]
    })
    setCartOpen(true)
  }

  const updateQty = (id: string, qty: number) => {
    setCart((prev) => prev.map((i) => (i.product.id === id ? { ...i, qty } : i)))
  }

  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((i) => i.product.id !== id))
  }

  return (
    <div className="min-h-screen bg-clover-paper">
      <Navbar
        cartCount={cartCount}
        onCartToggle={() => setCartOpen(true)}
        search={search}
        onSearch={setSearch}
      />

      <main>
        <Hero />
        <Catalog search={search} onAddToCart={addToCart} />
        <Impact />
        <SocialProof />

        {/* Cotizador */}
        <section id="cotizador" className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-clover-leaf">Flujo empresarial</p>
                <h2 className="mt-2 font-display text-4xl font-semibold text-clover-navy sm:text-5xl">
                  Cotizador dinámico B2B / B2C
                </h2>
                <p className="mt-4 text-clover-gray">
                  Selecciona productos y cantidades, y genera una solicitud formal de compra o alianza. Validación en tiempo real y respuesta en menos de 24 h.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    'Cálculo automático de totales por plan y kit',
                    'Validación de cantidades y campos en tiempo real',
                    'Envío directo por WhatsApp Business',
                    'Cotización formal en menos de 24 h',
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2 text-sm text-clover-ink">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-clover-leaf" />
                      {t}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setCartOpen(true)}
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-clover-deep px-6 py-3.5 text-sm font-semibold text-clover-paper shadow-lift transition-transform hover:-translate-y-0.5"
                >
                  Abrir cotizador ({cartCount})
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setCartOpen(true)
                }}
                className="rounded-[2rem] border border-clover-line bg-white p-6 shadow-card sm:p-8"
              >
                <h3 className="font-display text-2xl font-semibold text-clover-navy">Solicitud rápida</h3>
                <div className="mt-5 grid gap-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-widest text-clover-gray">Nombre o empresa</label>
                    <input
                      required
                      type="text"
                      className="mt-1.5 w-full rounded-xl border border-clover-line bg-clover-paper px-4 py-2.5 text-sm outline-none transition-colors focus:border-clover-deep"
                      placeholder="Tu nombre o razón social"
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-widest text-clover-gray">Correo</label>
                      <input
                        required
                        type="email"
                        className="mt-1.5 w-full rounded-xl border border-clover-line bg-clover-paper px-4 py-2.5 text-sm outline-none transition-colors focus:border-clover-deep"
                        placeholder="tu@correo.com"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-widest text-clover-gray">Teléfono</label>
                      <input
                        required
                        type="tel"
                        className="mt-1.5 w-full rounded-xl border border-clover-line bg-clover-paper px-4 py-2.5 text-sm outline-none transition-colors focus:border-clover-deep"
                        placeholder="+57 300 000 0000"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-widest text-clover-gray">Interés</label>
                    <select className="mt-1.5 w-full rounded-xl border border-clover-line bg-clover-paper px-4 py-2.5 text-sm outline-none transition-colors focus:border-clover-deep">
                      <option>Plan Estudiante</option>
                      <option>Plan Completo</option>
                      <option>Plan Empresa (B2B)</option>
                      <option>Kit Plantable</option>
                      <option>Alianza institucional</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-widest text-clover-gray">Mensaje</label>
                    <textarea
                      rows={3}
                      className="mt-1.5 w-full rounded-xl border border-clover-line bg-clover-paper px-4 py-2.5 text-sm outline-none transition-colors focus:border-clover-deep"
                      placeholder="Cuéntanos tu necesidad o volumen estimado"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-clover-deep px-6 py-3 text-sm font-semibold text-clover-paper shadow-soft transition-transform hover:-translate-y-0.5"
                  >
                    <Send className="h-4 w-4" />
                    Generar solicitud
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="bg-clover-sand py-20 sm:py-28">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-clover-leaf">Preguntas frecuentes</p>
              <h2 className="mt-2 font-display text-4xl font-semibold text-clover-navy sm:text-5xl">Resolvemos tus dudas</h2>
            </div>
            <div className="mt-10 space-y-3">
              {faqs.map((f, i) => {
                const open = openFaq === i
                return (
                  <div key={f.q} className="overflow-hidden rounded-2xl border border-clover-line bg-white shadow-card">
                    <button
                      onClick={() => setOpenFaq(open ? null : i)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    >
                      <span className="font-semibold text-clover-navy">{f.q}</span>
                      <ChevronDown className={cn('h-5 w-5 shrink-0 text-clover-gray transition-transform', open && 'rotate-180 text-clover-deep')} />
                    </button>
                    <div className={cn('grid transition-all duration-300', open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
                      <div className="overflow-hidden">
                        <p className="px-5 pb-5 text-sm leading-relaxed text-clover-gray">{f.a}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-clover-line bg-clover-paper">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
            <div>
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-2xl bg-clover-deep text-clover-paper">
                  <SproutIcon />
                </span>
                <span className="font-display text-lg font-semibold text-clover-navy">Clover</span>
              </div>
              <p className="mt-3 text-sm text-clover-gray">
                Hábitos verdes que florecen. App web gamificada, kit plantable y comunidad local en Fusagasugá.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-clover-deep">Navegación</h4>
              <ul className="mt-4 space-y-2 text-sm text-clover-gray">
                {[
                  { label: 'Inicio', id: 'inicio' },
                  { label: 'Catálogo', id: 'catalogo' },
                  { label: 'Impacto', id: 'impacto' },
                  { label: 'Casos', id: 'casos' },
                  { label: 'Cotizador', id: 'cotizador' },
                  { label: 'FAQ', id: 'faq' },
                ].map((l) => (
                  <li key={l.id}><a href={`#${l.id}`} className="hover:text-clover-deep">{l.label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-clover-deep">Contacto</h4>
              <ul className="mt-4 space-y-2 text-sm text-clover-gray">
                <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +57 300 000 0000</li>
                <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> hola@clover.co</li>
                <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Fusagasugá, Cundinamarca</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-clover-deep">Boletín</h4>
              <p className="mt-4 text-sm text-clover-gray">Recibe tips de hábitos verdes y novedades.</p>
              <div className="mt-3 flex gap-2">
                <input type="email" placeholder="tu@correo.com" className="flex-1 rounded-full border border-clover-line bg-white px-4 py-2 text-sm outline-none focus:border-clover-deep" />
                <button className="rounded-full bg-clover-deep px-4 py-2 text-sm font-semibold text-clover-paper">Suscribir</button>
              </div>
            </div>
          </div>
          <div className="border-t border-clover-line py-5 text-center text-xs text-clover-gray">
            © 2026 Clover · Fusagasugá, Cundinamarca · Hecho con 🌱 y código limpio.
          </div>
        </footer>
      </main>

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdate={updateQty}
        onRemove={removeItem}
      />
    </div>
  )
}

function SproutIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 20h10" />
      <path d="M12 20V10" />
      <path d="M12 10c0-3 2-5 5-5" />
      <path d="M12 10c0-3-2-5-5-5" />
    </svg>
  )
}