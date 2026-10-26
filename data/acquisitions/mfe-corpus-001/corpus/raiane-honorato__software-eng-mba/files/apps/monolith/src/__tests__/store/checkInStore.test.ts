import { useCheckInStore } from '../../store/checkInStore'

const initialState = {
  isActive: false,
  activeGymId: null,
  activeGymName: null,
  activeActivityIds: [],
  startTime: null,
  history: [],
}

beforeEach(() => {
  useCheckInStore.setState(initialState)
})

describe('initial state', () => {
  it('has no active check-in', () => {
    expect(useCheckInStore.getState().isActive).toBe(false)
  })

  it('has an empty history', () => {
    expect(useCheckInStore.getState().history).toHaveLength(0)
  })

  it('canCheckInToday returns true when there is no check-in today', () => {
    expect(useCheckInStore.getState().canCheckInToday()).toBe(true)
  })
})

describe('startCheckIn', () => {
  it('sets isActive and gym info correctly', () => {
    useCheckInStore.getState().startCheckIn('iron-forge', 'Iron Forge Fitness', ['musculacao'])

    const state = useCheckInStore.getState()
    expect(state.isActive).toBe(true)
    expect(state.activeGymId).toBe('iron-forge')
    expect(state.activeGymName).toBe('Iron Forge Fitness')
    expect(state.activeActivityIds).toEqual(['musculacao'])
  })

  it('canCheckInToday returns false when a check-in is active', () => {
    useCheckInStore.getState().startCheckIn('iron-forge', 'Iron Forge Fitness')
    expect(useCheckInStore.getState().canCheckInToday()).toBe(false)
  })
})

describe('endCheckIn', () => {
  it('moves the active check-in to history', () => {
    useCheckInStore.getState().startCheckIn('iron-forge', 'Iron Forge Fitness', ['musculacao'])
    useCheckInStore.getState().endCheckIn()

    const state = useCheckInStore.getState()
    expect(state.isActive).toBe(false)
    expect(state.history).toHaveLength(1)
    expect(state.history[0].gymId).toBe('iron-forge')
  })

  it('records calories when provided', () => {
    useCheckInStore.getState().startCheckIn('zen-flow', 'Zen Flow Studio')
    useCheckInStore.getState().endCheckIn(320)

    expect(useCheckInStore.getState().history[0].caloriesBurned).toBe(320)
  })

  it('canCheckInToday returns false after finishing a check-in today', () => {
    useCheckInStore.getState().startCheckIn('iron-forge', 'Iron Forge Fitness')
    useCheckInStore.getState().endCheckIn()
    expect(useCheckInStore.getState().canCheckInToday()).toBe(false)
  })
})

describe('saveRating', () => {
  it('saves the rating to the completed check-in in history', () => {
    useCheckInStore.getState().startCheckIn('iron-forge', 'Iron Forge Fitness')
    useCheckInStore.getState().endCheckIn()

    const { history } = useCheckInStore.getState()
    useCheckInStore.getState().saveRating(history[0].id, { stars: 5, note: 'Great session!' })

    expect(useCheckInStore.getState().history[0].rating).toEqual({ stars: 5, note: 'Great session!' })
  })
})
