describe('TimeFormatter', function() {
  var TimeFormatter

  beforeEach(inject(function(_TimeFormatter_,constants){
    TimeFormatter = _TimeFormatter_
  }))
  

  it('pads a number to 2 digits', function () {
    expect( TimeFormatter.pad(9) ).toEqual( '09' )
    expect( TimeFormatter.pad(10) ).toEqual( '10' )
  })

  it('formats seconds to mm:ss', function() {
    expect( TimeFormatter.formatSeconds(59)  ).toEqual( '00:59' )
    expect( TimeFormatter.formatSeconds(60)  ).toEqual( '01:00' )
    expect( TimeFormatter.formatSeconds(120) ).toEqual( '02:00' )
    expect( TimeFormatter.formatSeconds(754) ).toEqual( '12:34' )
  })
})