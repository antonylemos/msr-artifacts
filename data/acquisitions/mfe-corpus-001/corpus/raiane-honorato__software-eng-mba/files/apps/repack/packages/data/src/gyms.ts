export interface Activity {
  id: string
  name: string
}

export interface Gym {
  id: string
  name: string
  address: string
  distance: string
  rating: number
  photo: string
  activities: Activity[]
  tags: string[]
  hasQrCode: boolean
}

export const gyms: Gym[] = [
  {
    id: 'iron-forge',
    name: 'Iron Forge Fitness',
    address: 'Av. Paulista, 1578 — Bela Vista',
    distance: '1.2 km',
    rating: 4.9,
    photo: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
    activities: [
      { id: 'musculacao', name: 'Musculação' },
      { id: 'crossfit', name: 'Crossfit' },
      { id: 'hiit', name: 'HIIT' },
    ],
    tags: ['Musculação', 'Crossfit', 'HIIT'],
    hasQrCode: true,
  },
  {
    id: 'zen-flow',
    name: 'Zen Flow Studio',
    address: 'R. Augusta, 890 — Consolação',
    distance: '2.4 km',
    rating: 4.7,
    photo: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800',
    activities: [
      { id: 'yoga', name: 'Yoga' },
      { id: 'pilates', name: 'Pilates' },
    ],
    tags: ['Yoga', 'Pilates'],
    hasQrCode: false,
  },
  {
    id: 'apex-athletics',
    name: 'Apex Athletics',
    address: 'R. Oscar Freire, 340 — Jardins',
    distance: '3.1 km',
    rating: 4.8,
    photo: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800',
    activities: [
      { id: 'musculacao', name: 'Musculação' },
      { id: 'boxe', name: 'Boxe' },
    ],
    tags: ['Musculação', 'Boxe'],
    hasQrCode: true,
  },
  {
    id: 'oasis-pool',
    name: 'Oasis Pool & Fitness',
    address: 'Av. Brigadeiro Faria Lima, 2232 — Pinheiros',
    distance: '4.5 km',
    rating: 4.6,
    photo: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800',
    activities: [
      { id: 'natacao', name: 'Natação' },
      { id: 'musculacao', name: 'Musculação' },
    ],
    tags: ['Natação', 'Musculação'],
    hasQrCode: true,
  },
]
