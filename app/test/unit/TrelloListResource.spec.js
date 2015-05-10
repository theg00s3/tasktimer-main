describe('TrelloListResource', function() {
  var TrelloListResource
   , $httpBackend

  beforeEach(inject(function(_$httpBackend_,_TrelloListResource_){
    TrelloListResource = _TrelloListResource_
    $httpBackend = _$httpBackend_
  }))


  it('GETs a collection of list', function() {
    $httpBackend.expectGET('https://api.trello.com/1/lists').respond(200)
    TrelloListResource.query({})
    $httpBackend.flush()
  })

  it('GETs a single list', function() {
    $httpBackend.expectGET('https://api.trello.com/1/lists/54ba377379eed69e956ecfbb').respond(200)
    TrelloListResource.query({listId:'54ba377379eed69e956ecfbb'})
    $httpBackend.flush()
  })

})