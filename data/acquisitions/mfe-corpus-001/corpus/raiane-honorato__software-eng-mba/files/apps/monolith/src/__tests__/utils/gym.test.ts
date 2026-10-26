import { activityIcon, resolveFirstActivityName, resolveActivityNames } from '../../utils/gym'
import {
  BarbellIcon,
  LightningIcon,
  FlameIcon,
  LeafIcon,
  PersonSimpleRunIcon,
} from 'phosphor-react-native'
import type { CompletedCheckIn } from '../../store/checkInStore'

// Helper: monolith's resolveFirstActivityName takes the full CompletedCheckIn object,
// unlike the turborepo version which takes { gymId, activityIds } separately.
// This coupling between utils and the store shape is one of the architectural
// differences this PoC comparison surfaces.
const makeCheckIn = (gymId: string, activityIds?: string[]): CompletedCheckIn => ({
  id: '1',
  gymId,
  gymName: 'Test Gym',
  activityIds,
  startTime: new Date().toISOString(),
  endTime: new Date().toISOString(),
  durationMs: 3600000,
})

describe('activityIcon', () => {
  it('returns BarbellIcon for musculacao', () => {
    expect(activityIcon('musculacao')).toBe(BarbellIcon)
  })

  it('returns LightningIcon for crossfit', () => {
    expect(activityIcon('crossfit')).toBe(LightningIcon)
  })

  it('returns FlameIcon for hiit', () => {
    expect(activityIcon('hiit')).toBe(FlameIcon)
  })

  it('returns LeafIcon for yoga', () => {
    expect(activityIcon('yoga')).toBe(LeafIcon)
  })

  it('returns PersonSimpleRunIcon for unknown activity', () => {
    expect(activityIcon('unknown-activity')).toBe(PersonSimpleRunIcon)
  })
})

describe('resolveFirstActivityName', () => {
  it('returns the activity name for a valid gym and activity', () => {
    const result = resolveFirstActivityName(makeCheckIn('iron-forge', ['musculacao']))
    expect(result).toBe('Musculação')
  })

  it('returns "Treino" when activityIds is empty', () => {
    const result = resolveFirstActivityName(makeCheckIn('iron-forge', []))
    expect(result).toBe('Treino')
  })

  it('returns "Treino" when activityIds is undefined', () => {
    const result = resolveFirstActivityName(makeCheckIn('iron-forge', undefined))
    expect(result).toBe('Treino')
  })

  it('returns the raw activityId when gymId is not found', () => {
    const result = resolveFirstActivityName(makeCheckIn('unknown-gym', ['musculacao']))
    expect(result).toBe('musculacao')
  })
})

describe('resolveActivityNames', () => {
  it('returns activity names for a valid gym and activity list', () => {
    const result = resolveActivityNames('iron-forge', ['musculacao', 'crossfit'])
    expect(result).toEqual(['Musculação', 'Crossfit'])
  })

  it('returns the raw ids when gymId is not found', () => {
    const result = resolveActivityNames('unknown-gym', ['musculacao', 'crossfit'])
    expect(result).toEqual(['musculacao', 'crossfit'])
  })

  it('returns an empty array when activityIds is empty', () => {
    const result = resolveActivityNames('iron-forge', [])
    expect(result).toEqual([])
  })
})
