/* global expect */
import settings, { defaultState } from './settings'
import { toggleTickSound, toggleRingSound, grantNotificationPermission } from '../actions'

const dummyAction = { type: '', payload: {} }

describe('settings reducer', () => {
  it('sets default state when not specified', () => {
    expect(
      settings(undefined, dummyAction)
    ).toStrictEqual(defaultState)
  })

  it('toggles specific settings', () => {
    expect(
      settings(defaultState, toggleTickSound())
    ).toStrictEqual({
      ...defaultState,
      tickSoundEnabled: false
    })

    expect(
      settings(defaultState, toggleRingSound())
    ).toStrictEqual({
      ...defaultState,
      ringSoundEnabled: false
    })

    expect(
      settings(defaultState, grantNotificationPermission({ grant: true }))
    ).toStrictEqual({
      ...defaultState,
      notificationPermissionGranted: true
    })
  })
})
