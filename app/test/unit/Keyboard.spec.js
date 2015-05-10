describe('Keyboard', function() {
  var Keyboard

  beforeEach(inject(function(_Keyboard_){
    Keyboard = _Keyboard_
  }))


  it('calls a registered key/action', function() {
    var keyboard = new Keyboard()
    var obj = {
      foo : function(){},
    }
    var fooSpy = spyOn(obj, 'foo')
    keyboard.when(13, obj.foo)
    keyboard.handle(13)

    expect(fooSpy).toHaveBeenCalled()
  })

  it('returns instance so that it is possible to chain', function() {
    var keyboard = new Keyboard()
    var obj = {
      foo : function(){},
      bar : function(){},
    }
    var fooSpy = spyOn(obj, 'foo')
    var barSpy = spyOn(obj, 'bar')

    keyboard
      .when(13, obj.foo)
      .when(14, obj.bar)

    keyboard.handle(13)
    keyboard.handle(14)

    expect(fooSpy).toHaveBeenCalled()
    expect(barSpy).toHaveBeenCalled()
  })
})
