import user from './user'
import {authenticateUser} from '../actions'
import AuthService from '../modules/AuthService'

describe.skip('user reducer', () => {
  const user = {username:'test user'}
  it('sets user on success', () => {
    const MockAuthService = sinon.mock(AuthService)
    MockAuthService.expects('authenticate')

    user(undefined, authenticateUser())

    MockAuthService.verify()
  })
})
