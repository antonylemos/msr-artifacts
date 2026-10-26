import { create } from 'zustand'

export interface CheckInRating {
  stars: number
  note?: string
}

export interface CompletedCheckIn {
  id: string
  gymId: string
  gymName: string
  activityIds?: string[]
  startTime: string
  endTime: string
  durationMs: number
  caloriesBurned?: number
  rating?: CheckInRating
}

interface CheckInState {
  isActive: boolean
  activeGymId: string | null
  activeGymName: string | null
  activeActivityIds: string[]
  startTime: string | null
  history: CompletedCheckIn[]
  startCheckIn: (gymId: string, gymName: string, activityIds?: string[]) => void
  endCheckIn: (caloriesBurned?: number) => void
  saveRating: (checkInId: string, rating: CheckInRating) => void
  canCheckInToday: () => boolean
}

export const useCheckInStore = create<CheckInState>((set, get) => ({
  isActive: false,
  activeGymId: null,
  activeGymName: null,
  activeActivityIds: [],
  startTime: null,
  history: [],

  startCheckIn: (gymId, gymName, activityIds = []) => {
    set({
      isActive: true,
      activeGymId: gymId,
      activeGymName: gymName,
      activeActivityIds: activityIds,
      startTime: new Date().toISOString(),
    })
  },

  endCheckIn: (caloriesBurned) => {
    const state = get()
    if (!state.isActive || !state.startTime) return

    const endTime = new Date().toISOString()
    const durationMs = new Date(endTime).getTime() - new Date(state.startTime).getTime()

    const completed: CompletedCheckIn = {
      id: `${Date.now()}`,
      gymId: state.activeGymId!,
      gymName: state.activeGymName!,
      activityIds: state.activeActivityIds.length > 0 ? state.activeActivityIds : undefined,
      startTime: state.startTime,
      endTime,
      durationMs,
      caloriesBurned,
    }

    set((s) => ({
      isActive: false,
      activeGymId: null,
      activeGymName: null,
      activeActivityIds: [],
      startTime: null,
      history: [completed, ...s.history],
    }))
  },

  saveRating: (checkInId, rating) => {
    set((s) => ({
      history: s.history.map((c) => (c.id === checkInId ? { ...c, rating } : c)),
    }))
  },

  canCheckInToday: () => {
    const { history, isActive } = get()
    if (isActive) return false
    const today = new Date().toDateString()
    return !history.some((c) => new Date(c.endTime).toDateString() === today)
  },
}))
