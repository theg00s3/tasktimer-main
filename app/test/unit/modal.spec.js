describe('Modal', function() {
  var Modal,
    $rootScope

  var modalElement,modalDiv

  beforeEach(inject(function(_Modal_,$compile,_$rootScope_){
    Modal = _Modal_
    $rootScope = _$rootScope_

    modalElement = $compile('<modal name="myModal"></modal>')($rootScope)
    modalDiv = angular.element(modalElement[0].querySelector('.modal'))
  }))
  

  it('is hidden by default', function () {
    $rootScope.$digest()
    expect( modalDiv.attr('class') ).toBe( 'modal ng-hide' )
  })

  it('is shown when Modal.show("myModal") is called', function () {
    Modal.show('myModal')
    $rootScope.$digest()
    expect( modalDiv.attr('class') ).toBe( 'modal visible' )
  })

  it('is toggled when Modal.toggle("myModal") is called', function () {
    Modal.toggle('myModal')
    $rootScope.$digest()
    expect( modalDiv.attr('class') ).toBe( 'modal visible' )    
    
    Modal.toggle('myModal')
    $rootScope.$digest()
    expect( modalDiv.attr('class') ).toBe( 'modal ng-hide' )    
  })

})