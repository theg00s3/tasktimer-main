/* global expect */
import loading, {defaultState} from './loading'
import {LOAD_USER_REQUEST, LOAD_USER_ERROR} from '../actions'

describe('loading reducer', () => {
  it('.loadingUser is true when user is being updated', () => {
    expect(
      loading(defaultState, {type: LOAD_USER_REQUEST, payload: null})
    ).toStrictEqual(Object.assign({}, defaultState, {loadingUser: true}))
  })
  it('.loadingUser is false when user loading failed', () => {
    expect(
      loading(defaultState, {type: LOAD_USER_ERROR, payload: null})
    ).toStrictEqual(Object.assign({}, defaultState, {loadingUser: false}))
  })
})
