var TimelineUtils = require('./TimelineUtils')

var expect = require('chai').expect

describe('TimelineUtils', function () {
  var data = require('../../fixtures/timelineData.json')

  describe('calculates start and end', function () {
    it('undefined start time for an empty list', function () {
      expect( TimelineUtils.calculateStart([]) ).to.eql( undefined )
    })
    it('start time for list', function () {
      expect( TimelineUtils.calculateStart(data) ).to.eql( data[0].startedAt )
    })
    it('start time in hour format for list', function () {
      expect( TimelineUtils.calculateStartHour(data) ).to.match( /(17\:00|15\:00)/ )
    })
    it('undefined end time for an empty list', function () {
      expect( TimelineUtils.calculateEnd([]) ).to.eql( undefined )
    })
    it('end time for list', function () {
      expect( TimelineUtils.calculateEnd(data) ).to.eql( data[data.length-1].startedAt )
    })
    it('end time in hour format for list', function () {
      expect( TimelineUtils.calculateEndHour(data) ).to.match( /(18\:00|16\:00)/ )
    })
    it('start time for single item', function () {
      expect( TimelineUtils.calculateStart(data[0]) ).to.eql( data[0].startedAt )
    })
    it('end time for single item', function () {
      expect( TimelineUtils.calculateEnd(data[0]) ).to.eql( data[0].startedAt )
    })
  })


  describe('calculates timeline rendering data', function () {
    it('horizontal position', function () {
      expect( TimelineUtils.calculateTimelineItem(data[0], data).x ).to.eql( 208.3 )
      expect( TimelineUtils.calculateTimelineItem(data[1], data).x ).to.eql( 451.5 )
      expect( TimelineUtils.calculateTimelineItem(data[2], data).x ).to.eql( 616.9 )
      expect( TimelineUtils.calculateTimelineItem(data[3], data).x ).to.eql( 782.2 )
    })
    it('radius', function () {
      expect( TimelineUtils.calculateTimelineItem(data[0], data).r ).to.eql( 208.3 )
      expect( TimelineUtils.calculateTimelineItem(data[1], data).r ).to.eql( 41.6 )
      expect( TimelineUtils.calculateTimelineItem(data[2], data).r ).to.eql( 125 )
      expect( TimelineUtils.calculateTimelineItem(data[3], data).r ).to.eql( 208.3 )
    })
    it('className', function () {
      expect( TimelineUtils.calculateTimelineItem(data[0], data).className ).to.eql( data[0].type )
      expect( TimelineUtils.calculateTimelineItem(data[1], data).className ).to.eql( data[1].type )
      expect( TimelineUtils.calculateTimelineItem(data[2], data).className ).to.eql( data[2].type )
      expect( TimelineUtils.calculateTimelineItem(data[3], data).className ).to.eql( data[3].type )
    })
  })
})
