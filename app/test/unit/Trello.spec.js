describe('Trello', function () {
  var Trello,constants

  beforeEach(inject(function(_Trello_,_constants_){
    Trello = _Trello_
    constants = _constants_
  }))


  it('creates the correct grant url', function () {
    var grantUrl = href='https://trello.com/1/authorize?key=7d05f76e2da759f5ebbce17eca157000&name=Pomodoro.cc&scope=read&expiration=never&return_url='+ constants.host +'/trello'
    var generatedGrantUrl = Trello.getGrantUrl()
    expect( generatedGrantUrl ).toEqual( grantUrl )
  })

  it('sets token and remembers it', function () {
    Trello.setToken('mytoken')    
    expect( Trello.getToken() ).toEqual('mytoken')
  })

  it('gets the token from a string', function () {
    expect( Trello.getTokenFrom('token=mytoken') ).toEqual('mytoken')
  })

  it('gives information wether the user is already authenticated', function () {
    Trello.setToken('mytoken')    
    expect( Trello.isAuthorized() ).toEqual(true)
  })

})