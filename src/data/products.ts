export type ProductCategory = 'planes' | 'kit' | 'b2b'

export interface Product {
  id: string
  name: string
  category: ProductCategory
  price: number
  priceLabel: string
  tagline: string
  description: string
  features: string[]
  sustainable: string[]
  badge?: string
  accent: 'deep' | 'leaf' | 'teal' | 'gold'
  icon: string
}

export const categories: { id: ProductCategory | 'all'; label: string; hint: string }[] = [
  { id: 'all', label: 'Todo', hint: 'Portafolio completo' },
  { id: 'planes', label: 'Planes B2C', hint: 'Suscripción mensual' },
  { id: 'kit', label: 'Kit plantable', hint: 'Experiencia tangible' },
  { id: 'b2b', label: 'Empresas', hint: 'Convenios B2B' },
]

export const products: Product[] = [
  {
    id: 'plan-gratuito',
    name: 'Plan Semilla',
    category: 'planes',
    price: 0,
    priceLabel: 'Gratis',
    tagline: 'Empieza a construir el hábito sin costo.',
    description:
      'Versión freemium de la app web: retos básicos, registro de impacto y acceso a la comunidad. Diseñada para que la barrera de entrada sea cero y el hábito florezca.',
    features: [
      'Retos diarios y semanales',
      'Registro de impacto personal',
      'Acceso a la comunidad Clover',
      'Hasta 3 retos activos',
    ],
    sustainable: [
      'Digital-first: cero papel adicional',
      'Promueve consumo consciente',
    ],
    badge: 'Sin costo',
    accent: 'leaf',
    icon: 'sprout',
  },
  {
    id: 'plan-estudiante',
    name: 'Plan Estudiante',
    category: 'planes',
    price: 12000,
    priceLabel: '$12.000 / mes',
    tagline: 'El plan de entrada, fijado por la mediana de disposición a pagar.',
    description:
      'Desbloquea impacto medible, recompensas y el kit con descuento. Pensado para jóvenes de 15 a 25 años en Fusagasugá y la región.',
    features: [
      'Retos ilimitados + medición de impacto',
      'Recompensas y reconocimiento “Trébol del mes”',
      'Kit plantable con 20% de descuento',
      'Soporte prioritario en comunidad',
    ],
    sustainable: [
      'Huella de carbono por hábito visible',
      'Incentiva acciones verificables, no promesas',
    ],
    badge: 'Más elegido',
    accent: 'deep',
    icon: 'leaf',
  },
  {
    id: 'plan-completo',
    name: 'Plan Completo',
    category: 'planes',
    price: 18000,
    priceLabel: '$18.000 / mes',
    tagline: 'Toda la experiencia Clover, sin límites.',
    description:
      'Incluye todo lo del Plan Estudiante más analítica avanzada de impacto, retos grupales y acceso anticipado a nuevas funciones.',
    features: [
      'Todo lo del Plan Estudiante',
      'Analítica avanzada de impacto',
      'Retos grupales y ligas',
      'Acceso anticipado a nuevas funciones',
    ],
    sustainable: [
      'Reporte de impacto descargable',
      'Comparativa vs. promedio de la comunidad',
    ],
    accent: 'teal',
    icon: 'tree',
  },
  {
    id: 'kit-plantable',
    name: 'Kit Plantable Clover',
    category: 'kit',
    price: 29900,
    priceLabel: '$29.900',
    tagline: '20 hojas de papel reciclado con semillas de trébol blanco.',
    description:
      'Kit físico con 20 hojas de papel reciclado de 14 × 20 cm, gramaje 120 g/m², guía de siembra y sobre de fibra de coco. Cada hoja se siembra y germina trébol blanco (Trifolium repens).',
    features: [
      '20 hojas plantables de 14 × 20 cm',
      'Semillas de trébol blanco certificadas (ICA)',
      'Guía de siembra ilustrada',
      'Sobre de fibra de coco como sustrato',
    ],
    sustainable: [
      'Papel 100% reciclado, cortado a mano',
      'Tinta de impresión a base de agua',
      'Empaque de cartón kraft reciclable',
      'Trazabilidad por lote y prueba de germinación',
    ],
    badge: 'Margen 89,3%',
    accent: 'gold',
    icon: 'package',
  },
  {
    id: 'plan-b2b',
    name: 'Plan Empresa',
    category: 'b2b',
    price: 6000,
    priceLabel: '$6.000 / empleado / mes',
    tagline: 'Convierte la sostenibilidad en política de bienestar corporativo.',
    description:
      'Convenio B2B para universidades, empresas e instituciones: panel de impacto agregado, retos por equipos y reporte ESG listo para comunicar.',
    features: [
      'Panel de impacto agregado por equipo',
      'Retos inter-áreas y reconocimiento',
      'Reporte ESG descargable',
      'Acompañamiento de implementación',
    ],
    sustainable: [
      'Medición verificable del impacto colectivo',
      'Alinea la cultura corporativa con los ODS',
    ],
    badge: 'B2B',
    accent: 'teal',
    icon: 'building',
  },
]

export const formatCOP = (n: number) =>
  n === 0 ? 'Gratis' : new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n)