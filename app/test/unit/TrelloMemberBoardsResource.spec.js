describe('TrelloMemberBoardsResource', function() {
  var TrelloMemberBoardsResource
   , $httpBackend

  beforeEach(inject(function(_$httpBackend_,_TrelloMemberBoardsResource_){
    TrelloMemberBoardsResource = _TrelloMemberBoardsResource_
    $httpBackend = _$httpBackend_
  }))


  it('GETs a collection of board', function() {
    $httpBackend.expectGET('https://api.trello.com/1/members/me/boards').respond(200)
    TrelloMemberBoardsResource.query({})
    $httpBackend.flush()
  })

})