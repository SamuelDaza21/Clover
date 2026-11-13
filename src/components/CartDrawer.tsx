import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus, Trash2, MessageCircle, X, ShoppingCart } from 'lucide-react'
import { type Product, formatCOP } from '../data/products'


export interface CartItem { product: Product; qty: number }

interface CartDrawerProps {
  open: boolean
  onClose: () => void
  items: CartItem[]
  onUpdate: (id: string, qty: number) => void
  onRemove: (id: string) => void
}

export function CartDrawer({ open, onClose, items, onUpdate, onRemove }: CartDrawerProps) {
  const total = items.reduce((s, i) => s + i.product.price * i.qty, 0)
  const totalItems = items.reduce((s, i) => s + i.qty, 0)

  const whatsappMsg = encodeURIComponent(
    `Hola Clover, quiero cotizar:\n${items.map((i) => `- ${i.product.name} x${i.qty} (${formatCOP(i.product.price)})`).join('\n')}\nTotal estimado: ${formatCOP(total)}`
  )

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-clover-navy/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-clover-paper shadow-lift"
          >
            <div className="flex items-center justify-between border-b border-clover-line px-5 py-4">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-clover-deep" />
                <h3 className="font-display text-xl font-semibold text-clover-navy">Cotización</h3>
                <span className="rounded-full bg-clover-mint px-2 py-0.5 text-xs font-semibold text-clover-deep">
                  {totalItems}
                </span>
              </div>
              <button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full bg-white text-clover-gray hover:text-clover-deep" aria-label="Cerrar">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="mt-16 text-center">
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-clover-mint text-clover-deep">
                    <ShoppingCart className="h-7 w-7" />
                  </div>
                  <p className="mt-4 font-display text-xl text-clover-navy">Tu cotización está vacía</p>
                  <p className="mt-2 text-sm text-clover-gray">Agrega planes o kits desde el catálogo.</p>
                </div>
              ) : (
                <ul className="space-y-3">
                  {items.map((i) => (
                    <li key={i.product.id} className="rounded-2xl border border-clover-line bg-white p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold text-clover-navy">{i.product.name}</p>
                          <p className="text-xs text-clover-gray">{formatCOP(i.product.price)}</p>
                        </div>
                        <button onClick={() => onRemove(i.product.id)} className="text-clover-gray hover:text-red-500" aria-label="Eliminar">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-2 rounded-full border border-clover-line bg-clover-paper px-2 py-1">
                          <button onClick={() => onUpdate(i.product.id, Math.max(1, i.qty - 1))} className="grid h-6 w-6 place-items-center rounded-full hover:bg-clover-mint">
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center text-sm font-semibold">{i.qty}</span>
                          <button onClick={() => onUpdate(i.product.id, i.qty + 1)} className="grid h-6 w-6 place-items-center rounded-full hover:bg-clover-mint">
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <p className="font-display text-lg font-semibold text-clover-navy">
                          {formatCOP(i.product.price * i.qty)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-clover-line bg-white px-5 py-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-clover-gray">Total estimado</span>
                  <span className="font-display text-2xl font-semibold text-clover-navy">{formatCOP(total)}</span>
                </div>
                <a
                  href={`https://wa.me/573000000000?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-clover-leaf px-5 py-3 text-sm font-semibold text-white shadow-soft transition-transform hover:-translate-y-0.5"
                >
                  <MessageCircle className="h-4 w-4" />
                  Enviar solicitud por WhatsApp
                </a>
                <p className="mt-2 text-center text-[11px] text-clover-gray">
                  Te responderemos con la cotización formal en menos de 24 h.
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}