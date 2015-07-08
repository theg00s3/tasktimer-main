var TimelineUtils = require('./TimelineUtils')

var expect = require('chai').expect

describe('TimelineUtils', function () {
  var data = [{
    startedAt: 1436024075955
  },{
    startedAt: 1436026529814
  },{
    startedAt: 1436026668724
  },{
    startedAt: 1436026851193
  },{
    startedAt: 1436032696618
  }]

  it('returns undefined for an empty list', function () {
    expect( TimelineUtils.getStart([]) ).to.eql( undefined )
  })

  it('calculates the start time', function () {
    expect( TimelineUtils.getStart(data) ).to.eql( data[0].startedAt )
  })

  it('calculates the start time in hour format', function () {
    expect( TimelineUtils.getStartHour(data) ).to.eql( '15:00' )
  })
  
  it('calculates the end time', function () {
    expect( TimelineUtils.getEnd(data) ).to.eql( data[data.length-1].startedAt )
  })

  it('calculates the end time in hour format', function () {
    expect( TimelineUtils.getEndHour(data) ).to.eql( '18:00' )
  })

  it('can be used to get the start time from a single item', function () {
    expect( TimelineUtils.getStart(data[0]) ).to.eql( data[0].startedAt )
  })

  it('can be used to get the end time from a single item', function () {
    expect( TimelineUtils.getEnd(data[0]) ).to.eql( data[0].startedAt )
  })

  it('calculates the position in percent relative to start and end time', function () {
    expect( TimelineUtils.getRenderingData(data[0], data) ).to.deep.eql( {x:'19.1%'} )
  })
})
