import { activityIcon } from '../src/gym'
import {
  BarbellIcon,
  LightningIcon,
  FlameIcon,
  LeafIcon,
  PersonSimpleRunIcon,
} from 'phosphor-react-native'

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
