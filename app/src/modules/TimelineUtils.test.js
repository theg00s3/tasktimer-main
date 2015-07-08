var TimelineUtils = require('./TimelineUtils')

var expect = require('chai').expect

describe('TimelineUtils', function () {
  var data = [{
    startedAt: 123456789
  },{
    startedAt: 123466789
  },{
    startedAt: 123476789
  },{
    startedAt: 127086789
  }]

  it('returns undefined for an empty list', function () {
    expect( TimelineUtils.getStart([]) ).to.eql( undefined )
  })

  it('calculates the start time', function () {
    expect( TimelineUtils.getStart(data) ).to.eql( data[0].startedAt )
  })

  it('calculates the start time in hour format', function () {
    expect( TimelineUtils.getStartHour(data) ).to.eql( '10:00' )
  })
  
  it('calculates the end time', function () {
    expect( TimelineUtils.getEnd(data) ).to.eql( data[data.length-1].startedAt )
  })

  it('calculates the end time in hour format', function () {
    expect( TimelineUtils.getEndHour(data) ).to.eql( '11:59' )
  })

  it('can be used to get the start time from a single item', function () {
    expect( TimelineUtils.getStart(data[0]) ).to.eql( data[0].startedAt )
  })

  it('can be used to get the end time from a single item', function () {
    expect( TimelineUtils.getEnd(data[0]) ).to.eql( data[0].startedAt )
  })

  xit('calculates the position in percent relative to start and end time', function () {
    expect( TimelineUtils.getRenderingData(data[2], data) ).to.deep.eql( {x:'66.66%'} )
  })
})
