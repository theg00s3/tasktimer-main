/* global expect */
import settings, {defaultState} from './settings'
import {toggleTickSound, toggleRingSound, grantNotificationPermission, acknowledgeWelcome} from '../actions'

const dummyAction = {type: '', payload: {}}

describe('settings reducer', () => {
  it('sets default state when not specified', () => {
    expect(
      settings(undefined, dummyAction)
    ).to.deep.eql(defaultState)
  })

  it('toggles specific settings', () => {
    expect(
      settings(defaultState, toggleTickSound())
    ).to.deep.eql({
      ...defaultState,
      tickSoundEnabled: false
    })

    expect(
      settings(defaultState, toggleRingSound())
    ).to.deep.eql({
      ...defaultState,
      ringSoundEnabled: false
    })

    expect(
      settings(defaultState, grantNotificationPermission(true))
    ).to.deep.eql({
      ...defaultState,
      notificationPermissionGranted: true
    })

    expect(
      settings(defaultState, acknowledgeWelcome())
    ).to.deep.eql({
      ...defaultState,
      acknlowedgedWelcome: true
    })
  })
})
