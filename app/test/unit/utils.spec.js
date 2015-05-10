describe('utils', function() {
  var utils

  beforeEach(inject(function(_utils_){
    utils = _utils_
  }))
  

  it('trims decimals to desired number', function() {
    expect( utils.trimDecimals(10.555,2) ).toEqual(10.55)
    expect( utils.trimDecimals(10,2) ).toEqual(10)
    expect( utils.trimDecimals(10.123,1) ).toEqual(10.1)
  })
  
})