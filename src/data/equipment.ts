export const REFERENCE_DATE = '2026-08-17'

export interface Equipment {
  id: number
  name: string
  type: string
  category: string
  status: string
  image?: string
  nextMaintenance: string | null
  odometer?: number
}

export const equipment: Equipment[] = [
  {
    id: 1,
    name: 'Green Tractor',
    type: 'Vehicle',
    category: 'Tractor',
    status: 'Operational',
    image: '🚜',
    nextMaintenance: '2026-09-12',
    odometer: 287,
  },
  {
    id: 2,
    name: 'Grape Harvester',
    type: 'Vehicle',
    category: 'Harvester',
    status: 'Operational',
    image: '🌾',
    nextMaintenance: null,
    odometer: 6200,
  },
  {
    id: 3,
    name: 'Helicopter',
    type: 'Aircraft',
    category: 'Aerial',
    status: 'Maintenance due',
    image: '🚁',
    nextMaintenance: '2026-08-16',
    odometer: 941,
  },
  {
    id: 4,
    name: 'Kubota Tractor 50 HP',
    type: 'Vehicle',
    category: 'Tractor',
    status: 'Operational',
    image: '🚜',
    nextMaintenance: null,
    odometer: 1140,
  },
  {
    id: 5,
    name: 'Combine Harvester',
    type: 'Vehicle',
    category: 'Harvester',
    status: 'Maintenance due',
    image: '🌽',
    nextMaintenance: '2026-07-30',
    odometer: 3820,
  },
  {
    id: 6,
    name: 'Utility Vehicle',
    type: 'Vehicle',
    category: 'Utility',
    status: 'Operational',
    image: '🛻',
    nextMaintenance: '2026-10-05',
    odometer: 452,
  },
  {
    id: 7,
    name: 'Orchard Sprayer',
    type: 'Implement',
    category: 'Sprayer',
    status: 'Out of service',
    image: '💧',
    nextMaintenance: '2026-06-01',
  },
  {
    id: 8,
    name: 'Track Excavator',
    type: 'Plant',
    category: 'Earthmoving',
    status: 'Operational',
    image: '🏗️',
    nextMaintenance: '2026-11-20',
    odometer: 763,
  },
  {
    id: 9,
    name: 'Compact Vineyard Tractor',
    type: 'Vehicle',
    category: 'Tractor',
    status: 'Maintenance due',
    image: '🚜',
    nextMaintenance: '2026-08-01',
    odometer: 2098,
  },
]

export function isMaintenanceOverdue(date: string | null): boolean {
  return date !== null && date < REFERENCE_DATE
}

export function formatMaintenanceDate(date: string): string {
  const [year, month, day] = date.split('-')
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  return `${day} ${monthNames[Number(month) - 1]} ${year}`
}
