angular.module('app')
.factory('Tags', function(TagsValidator){
  function Tags(_tags){
    var self = this

    var tags = []

    _.each(_tags || [], function(tag, key, list){
      tags.push(tag)
    })

    self.get = function(){
      return tags
    }

    self.restore = function(_tags){
      tags.length = 0
      tags.push.apply(tags, _tags)
    }

    self.canAdd = function(tag){
      return TagsValidator.canAddTo(tags,tag)
    }

    self.add = function(tag){
      if( !self.canAdd(tag) ){ return undefined }
      return tags.push(tag)
    }

    self.remove = function(tag){
      return tags.splice( tags.indexOf(tag), 1 )
    }

    self.has = function(tag){
      return tags.indexOf(tag)>=0
    }

    self.toJSON = function(){
      return tags
    }
  }

  return Tags
})
