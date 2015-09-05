var TimelineUtils = require('./TimelineUtils')

var expect = require('chai').expect
var sinon = require('sinon')

describe('WebSocketService', function () {
  var WebSocketService

  beforeEach(function () {
    WebSocketService = require('./WebSocketService')
  })

  afterEach(function () {
    WebSocketService.destroy()
  })

  it('can be initialized', function () {
    var socket = WebSocketService.initialize()
    expect( socket ).to.be.ok
  })

  it('can be destroyed', function () {
    var socket = WebSocketService.initialize()
    expect( socket ).to.be.ok
    socket = WebSocketService.destroy()
    expect( socket ).to.be.not.ok
  })

  it('joins channel', function () {
    var socket = WebSocketService.initialize()
    expect( socket ).to.be.ok
    var spy = sinon.stub(socket, 'send', function(){})
    expect( spy.called ).to.be.false

    WebSocketService.join('global', 'pomodoro_event')
    expect( spy.called ).to.be.true
    expect( spy.calledWith(JSON.stringify({
      topic:'global:pomodoro_event',
      event: 'phx_join',
      payload: {},
      ref: 0
    })) ).to.be.true
  })

  it('sends message as object', function () {
    var socket = WebSocketService.initialize()
    expect( socket ).to.be.ok
    var spy = sinon.stub(socket, 'send', function(){})
    expect( spy.called ).to.be.false

    WebSocketService.send('hello')
    expect( spy.called ).to.be.true
    expect( spy.calledWith(JSON.stringify({
      data:'hello'
    })) ).to.be.true
  })
})
