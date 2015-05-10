describe('PomodoroResource', function() {
  var PomodoroResource
   , $httpBackend

  beforeEach(inject(function(_$httpBackend_,_PomodoroResource_){
    PomodoroResource = _PomodoroResource_
    $httpBackend = _$httpBackend_
  }))
  

  it('POSTs to /api/pomodoro', function() {
    $httpBackend.expectPOST('/api/pomodoro',{}).respond(201)
    PomodoroResource.create({})
    $httpBackend.flush()
  })

  it('GETs pomodori for a specific day', function() {
    $httpBackend.expectGET('/api/pomodoro?day=01%2F01%2F1970').respond(200,[])
    PomodoroResource.query({day:'01/01/1970'})
    $httpBackend.flush()
  })

  it('GETs pomodori for a specific week', function() {
    $httpBackend.expectGET('/api/pomodoro?week=01%2F01%2F1970').respond(200,[])
    PomodoroResource.query({week:'01/01/1970'})
    $httpBackend.flush()
  })

})