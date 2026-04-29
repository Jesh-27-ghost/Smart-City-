import { create } from 'zustand'

export const useCityStore = create((set) => ({
  // Navigation State
  activeSection: 'command-center',
  selectedPin: null,
  userRole: 'admin', // 'admin' or 'user'

  // Traffic State
  trafficJunctions: {
    mp_nagar: { speed: 12, congestion: 85, ai_routing: true },
    new_market: { speed: 25, congestion: 40, ai_routing: false }
  },

  // Waste State
  bins: {
    ward_12: { fill: 60, status: 'normal' },
    ward_14: { fill: 90, status: 'critical' }
  },

  // Parking State
  parkingSlots: {
    db_mall_1: { status: 'free' },
    db_mall_2: { status: 'occupied' },
    db_mall_3: { status: 'free' },
  },

  // Energy State
  gridStatus: {
    load: 78,
    solar_gen: 450,
    outages: 1
  },

  // Actions
  setSection: (section) => set({ activeSection: section, selectedPin: null }),
  setSelectedPin: (pin) => set({ selectedPin: pin }),
  setUserRole: (role) => set({ userRole: role }),
  
  updateBinLevel: (id, level) => set(state => ({
    bins: { ...state.bins, [id]: { ...state.bins[id], fill: level, status: level > 80 ? 'critical' : 'normal' } }
  })),

  updateParkingSlot: (id, status) => set(state => ({
    parkingSlots: { ...state.parkingSlots, [id]: { ...state.parkingSlots[id], status } }
  })),
  
  updateTrafficJunction: (id, data) => set(state => ({
    trafficJunctions: { ...state.trafficJunctions, [id]: { ...state.trafficJunctions[id], ...data } }
  }))
}))
