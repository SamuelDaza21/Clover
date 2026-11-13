import { useState } from 'react'
import { Leaf, Search, ShoppingCart, Menu, X, Sprout } from 'lucide-react'
import { cn } from '../lib/utils'

interface NavbarProps {
  cartCount: number
  onCartToggle: () => void
  search: string
  onSearch: (v: string) => void
}

const navLinks = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#catalogo', label: 'Catálogo' },
  { href: '#impacto', label: 'Impacto' },
  { href: '#casos', label: 'Casos' },
  { href: '#cotizador', label: 'Cotizador' },
  { href: '#faq', label: 'FAQ' },
]

export function Navbar({ cartCount, onCartToggle, search, onSearch }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="border-b border-clover-line/60 bg-clover-paper/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <a href="#inicio" className="group flex items-center gap-2 shrink-0">
            <span className="grid h-9 w-9 place-items-center rounded-2xl bg-clover-deep text-clover-paper shadow-soft transition-transform group-hover:rotate-[-6deg]">
              <Sprout className="h-5 w-5" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-lg font-semibold text-clover-navy">Clover</span>
              <span className="text-[10px] font-medium tracking-wide text-clover-gray">Hábitos verdes que florecen</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 ml-6">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-3 py-1.5 text-sm font-medium text-clover-ink/80 transition-colors hover:bg-clover-mint hover:text-clover-deep"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            {/* Impact pill */}
            <div className="hidden lg:flex items-center gap-2 rounded-full border border-clover-line bg-white px-3 py-1.5 text-xs font-medium text-clover-deep">
              <Leaf className="h-3.5 w-3.5" />
              <span>Impacto: <strong>12,4 kg CO₂</strong> evitados</span>
            </div>

            {/* Search */}
            <div className={cn('relative transition-all', searchOpen ? 'w-44 sm:w-56' : 'w-9')}>
              {searchOpen ? (
                <div className="flex items-center gap-1 rounded-full border border-clover-line bg-white px-3 py-1.5">
                  <Search className="h-4 w-4 text-clover-gray" />
                  <input
                    autoFocus
                    value={search}
                    onChange={(e) => onSearch(e.target.value)}
                    placeholder="Buscar planes, kits…"
                    className="w-full bg-transparent text-sm outline-none placeholder:text-clover-gray/70"
                  />
                  <button onClick={() => { setSearchOpen(false); onSearch('') }} className="text-clover-gray hover:text-clover-deep">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="grid h-9 w-9 place-items-center rounded-full border border-clover-line bg-white text-clover-gray transition-colors hover:border-clover-deep hover:text-clover-deep"
                  aria-label="Buscar"
                >
                  <Search className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Cart */}
            <button
              onClick={onCartToggle}
              className="relative grid h-9 w-9 place-items-center rounded-full bg-clover-deep text-clover-paper transition-transform hover:scale-105"
              aria-label="Abrir cotizador"
            >
              <ShoppingCart className="h-4 w-4" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-clover-gold px-1 text-[10px] font-bold text-clover-navy">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu */}
            <button
              onClick={() => setOpen((v) => !v)}
              className="grid h-9 w-9 place-items-center rounded-full border border-clover-line bg-white text-clover-gray md:hidden"
              aria-label="Menú"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {open && (
          <div className="border-t border-clover-line/60 bg-clover-paper md:hidden">
            <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2 text-sm font-medium text-clover-ink hover:bg-clover-mint"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}