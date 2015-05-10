describe('RoomValidator', function() {
  var RoomValidator

  beforeEach(inject(function(_RoomValidator_){
    RoomValidator = _RoomValidator_
  }))


  it('validates a room', function() {
    expect(RoomValidator.validate('valid')).toBeTruthy()
    expect(RoomValidator.validate('also-valid')).toBeTruthy()
    expect(RoomValidator.validate('also_valid')).toBeTruthy()
    expect(RoomValidator.validate('valid?')).toBeFalsy()
    expect(RoomValidator.validate('va lid')).toBeFalsy()
  })


})
