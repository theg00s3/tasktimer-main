var expect = require('chai').expect
var sinon = require('sinon')

var SettingsEventHandler = require('./SettingsEventHandler')
var constants = require('../constants')
var FakeStore = require('../../fixtures/FakeStore')
var MockStore

describe('SettingsEventHandler', function () {
  beforeEach(function () {
    MockStore = sinon.mock(FakeStore)
  })

  it('gets current settings', function () {
    MockStore.expects('get').once()

    SettingsEventHandler(FakeStore)

    MockStore.verify()
  })

  it('saves muted ticking sounds', function () {
    MockStore.expects('get').once()
    MockStore.expects('set').once().withArgs(constants.tickingSoundKey, false)

    SettingsEventHandler(FakeStore)('tick', false)

    MockStore.verify()
  })
})
