var expect = require('chai').expect
var sinon = require('sinon')

describe('PhoenixWebSocketService', function () {
  var PhoenixWebSocketService
    , socket

  beforeEach(function () {
    PhoenixWebSocketService = require('./PhoenixWebSocketService')
    socket = PhoenixWebSocketService.initialize()
  })

  afterEach(function () {
    PhoenixWebSocketService.destroy()
  })

  it('#destroy', function () {
    socket = PhoenixWebSocketService.destroy(socket)
    expect( socket ).to.be.not.ok
  })

  it('#join', function () {
    var spy = sinon.stub(socket, 'send', function(){})
    expect( spy.called ).to.be.false

    PhoenixWebSocketService.join(socket, 'global', 'pomodoro_event')
    expect( spy.called ).to.be.true
    expect( spy.calledWith(JSON.stringify({
      topic:'global:pomodoro_event',
      event: 'phx_join',
      payload: {},
      ref: 0
    })) ).to.be.true
  })

  it('#send', function () {
    var spy = sinon.stub(socket, 'send', function(){})
    expect( spy.called ).to.be.false

    PhoenixWebSocketService.send(socket, 'hello')
    expect( spy.called ).to.be.true
    expect( spy.calledWith(JSON.stringify({
      data:'hello'
    })) ).to.be.true
  })
})
