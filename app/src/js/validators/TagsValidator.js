angular.module('app')
.service('TagsValidator', function(constants){
  var self = this

  self.validate = function(tag){
    if( !tag ){
      return false
    }
    return angular.isArray(tag)
      ? areValidTags(tag)
      : isValidTag(tag)
  }

  self.canAddTo = function(tags,tag){
    if( !self.validate(tags) || tag !== undefined && !self.validate(tag) ){
      return false
    }
    if(tags.length === constants.tagsLimit){
      return false
    }
    return !contains(tags,tag)
  }

  function areValidTags(tags){
    if(!tags || tags.length>constants.tagsLimit){
      return false
    }
    if( hasDuplicates(tags) ){
      return false
    }
    for (var i = tags.length - 1; i >= 0; i--) {
      var tag = tags[i]
      if( !isValidTag(tag) ){
        return false
      }
    }
    return true
  }

  function isValidTag(tag){
    if(!tag){
      return false
    }
    tag = tag.trim()
    return tag.length > 0 && tag.length < 20
  }

  function hasDuplicates(tags){
    return _.uniq(tags, JSON.stringify).length !== tags.length
  }

  function contains(tags, tag){
    return tags.indexOf(tag) >= 0
  }
})
