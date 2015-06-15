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
    startedAt: 123486789
  }]

  it('returns undefined for an empty list', function () {
    expect( TimelineUtils.getStart([]) ).to.eql( undefined )
  })

  it('calculates the start time', function () {
    expect( TimelineUtils.getStart(data) ).to.eql( data[0].startedAt )
  })

  it('calculates the end time', function () {
    expect( TimelineUtils.getEnd(data) ).to.eql( data[data.length-1].startedAt )
  })
})
