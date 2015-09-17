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

  xit('#join', function () {
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

  xit('#send', function () {
    var spy = sinon.stub(socket, 'send', function(){})
    expect( spy.called ).to.be.false

    PhoenixWebSocketService.join(socket, 'global', 'pomodoro_event')
    PhoenixWebSocketService.send(socket, 'new_msg', {text: 'msg text'})
    expect( spy.called ).to.be.true
    console.log( '-- ', spy.called )
    expect( spy.calledWith(JSON.stringify({
      topic:'global:pomodoro_event',
      event: 'new_msg',
      payload: {text: 'msg text'},
      ref: 0
    })) ).to.be.true
  })
})