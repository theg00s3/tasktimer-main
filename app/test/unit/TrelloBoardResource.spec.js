describe('TrelloBoardResource', function() {
  var TrelloBoardResource
   , $httpBackend

  beforeEach(inject(function(_$httpBackend_,_TrelloBoardResource_){
    TrelloBoardResource = _TrelloBoardResource_
    $httpBackend = _$httpBackend_
  }))
  

  it('GETs a collection of board', function() {
    $httpBackend.expectGET('https://api.trello.com/1/boards').respond(200)
    TrelloBoardResource.query({})
    $httpBackend.flush()
  })

  it('GETs a single board', function() {
    $httpBackend.expectGET('https://api.trello.com/1/boards/54ba377379eed69e956ecfbb').respond(200)
    TrelloBoardResource.query({boardId:'54ba377379eed69e956ecfbb'})
    $httpBackend.flush()
  })

})