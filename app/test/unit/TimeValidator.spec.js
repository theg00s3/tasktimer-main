describe('TimeValidator', function() {
  var TimeValidator

  beforeEach(inject(function(_TimeValidator_){
    TimeValidator = _TimeValidator_
  }))
  

  it('validates minutes', function() {
    expect( TimeValidator.validateMinutes(1) ).toBeTruthy()
    expect( TimeValidator.validateMinutes(2) ).toBeTruthy()

    expect( TimeValidator.validateMinutes(-1) ).toBeFalsy()
    expect( TimeValidator.validateMinutes(1.1) ).toBeFalsy()
    expect( TimeValidator.validateMinutes('fd1') ).toBeFalsy()
    expect( TimeValidator.validateMinutes('1fd') ).toBeFalsy()
  })

  it('validates seconds', function() {
    expect( TimeValidator.validateSeconds(1) ).toBeTruthy()
    expect( TimeValidator.validateSeconds(2) ).toBeTruthy()

    expect( TimeValidator.validateSeconds(-1) ).toBeFalsy()
    expect( TimeValidator.validateSeconds(1.1) ).toBeFalsy()
    expect( TimeValidator.validateSeconds('fd1') ).toBeFalsy()
    expect( TimeValidator.validateSeconds('1fd') ).toBeFalsy()
  })

  it('validates days', function() {
    expect( TimeValidator.validateDay('04/09/2014') ).toBeTruthy()
    expect( TimeValidator.validateDay('06/09/2014') ).toBeTruthy()
    expect( TimeValidator.validateDay('31/10/2014') ).toBeTruthy()
    expect( TimeValidator.validateDay('31/12/2014') ).toBeTruthy()
    expect( TimeValidator.validateDay('01/01/2014') ).toBeTruthy()
    expect( TimeValidator.validateDay('21/01/2014') ).toBeTruthy()


    expect( TimeValidator.validateDay('32/-2/2013') ).toBeFalsy()
    expect( TimeValidator.validateDay('21/31/2013') ).toBeFalsy()
    expect( TimeValidator.validateDay('FF/09/2013') ).toBeFalsy()
    expect( TimeValidator.validateDay('27/09') ).toBeFalsy()
    expect( TimeValidator.validateDay('31/11/2013') ).toBeFalsy()
    expect( TimeValidator.validateDay('31/9') ).toBeFalsy()
    expect( TimeValidator.validateDay('30.9/9/2013') ).toBeFalsy()
    expect( TimeValidator.validateDay('-1/009/2013') ).toBeFalsy()
    expect( TimeValidator.validateDay('-f/09/2013') ).toBeFalsy()
  })

  it('validates weeks', function() {
    expect( TimeValidator.validateWeek('1') ).toBeTruthy()
    expect( TimeValidator.validateWeek('10') ).toBeTruthy()
    expect( TimeValidator.validateWeek('52') ).toBeTruthy()

    expect( TimeValidator.validateWeek('-f') ).toBeFalsy()
    expect( TimeValidator.validateWeek('0') ).toBeFalsy()
    expect( TimeValidator.validateWeek('-2') ).toBeFalsy()
    expect( TimeValidator.validateWeek('53') ).toBeFalsy()
  })

})