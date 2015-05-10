angular.module('app')
.factory('TrelloMemberBoardsResource', function($resource){
  return $resource('https://api.trello.com/1/members/me/boards',{},{
    query: {
      method:'GET',
      isArray: true
    }
  })
})