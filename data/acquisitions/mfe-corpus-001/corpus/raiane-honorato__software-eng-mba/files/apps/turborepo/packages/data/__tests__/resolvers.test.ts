import { resolveFirstActivityName, resolveActivityNames } from '../src/resolvers'

describe('resolveFirstActivityName', () => {
  it('returns the activity name for a valid gym and activity', () => {
    const result = resolveFirstActivityName({
      gymId: 'iron-forge',
      activityIds: ['musculacao'],
    })
    expect(result).toBe('Musculação')
  })

  it('returns "Treino" when activityIds is empty', () => {
    const result = resolveFirstActivityName({ gymId: 'iron-forge', activityIds: [] })
    expect(result).toBe('Treino')
  })

  it('returns "Treino" when activityIds is undefined', () => {
    const result = resolveFirstActivityName({ gymId: 'iron-forge', activityIds: undefined })
    expect(result).toBe('Treino')
  })

  it('returns the raw activityId when gymId is not found', () => {
    const result = resolveFirstActivityName({
      gymId: 'unknown-gym',
      activityIds: ['musculacao'],
    })
    expect(result).toBe('musculacao')
  })
})

describe('resolveActivityNames', () => {
  it('returns activity names for a valid gym and activity list', () => {
    const result = resolveActivityNames({
      gymId: 'iron-forge',
      activityIds: ['musculacao', 'crossfit'],
    })
    expect(result).toEqual(['Musculação', 'Crossfit'])
  })

  it('returns the raw ids when gymId is not found', () => {
    const result = resolveActivityNames({
      gymId: 'unknown-gym',
      activityIds: ['musculacao', 'crossfit'],
    })
    expect(result).toEqual(['musculacao', 'crossfit'])
  })

  it('returns an empty array when activityIds is empty', () => {
    const result = resolveActivityNames({ gymId: 'iron-forge', activityIds: [] })
    expect(result).toEqual([])
  })
})
