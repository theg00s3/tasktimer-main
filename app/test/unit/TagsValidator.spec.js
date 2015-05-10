describe('TagsValidator', function() {
  var TagsValidator

  var fullArray = ['tag1','tag2','tag3','tag4','tag5']
  var overfullArray = ['tag1','tag2','tag3','tag4','tag5','tag6']
  var hasSlotArray = ['tag1','tag2']

  beforeEach(inject(function(_TagsValidator_){
    TagsValidator = _TagsValidator_
  }))
  

  it('does not validate a tag that is longer than 20 characters', function() {
    expect(TagsValidator.validate('this is a text longer thao twenty characters')).toBeFalsy()
  })

  it('does not validate a tag without content', function() {
    expect(TagsValidator.validate('')).toBeFalsy()
    expect(TagsValidator.validate(' ')).toBeFalsy()
    expect(TagsValidator.validate(null)).toBeFalsy()
  })

  it('validates a valid tag', function() {
    expect(TagsValidator.validate('valid tag')).toBeTruthy()    
  })

  it('validates an empty array', function() {
    expect(TagsValidator.validate([])).toBeTruthy()
  })

  it('does not validate an array of tags with duplicates', function() {
    expect(TagsValidator.validate(['tag1','tag1'])).toBeFalsy()

    expect(TagsValidator.validate(['tag1','tag2','tag1'])).toBeFalsy()
  })

  it('does not validate an array with more than 5 elements', function() {
    expect(TagsValidator.validate(overfullArray)).toBeFalsy()
  })

  it('validates a full array', function() {
    expect(TagsValidator.validate(fullArray)).toBeTruthy()
  })

  it('does not add a tag to over full array', function() {
    expect(TagsValidator.canAddTo(overfullArray,'tag6')).toBeFalsy()
  })

  it('does not add a tag to full array', function() {
    expect(TagsValidator.canAddTo(fullArray,'tag6')).toBeFalsy()
  })

  it('does add a duplicate tag', function() {
    expect(TagsValidator.canAddTo(hasSlotArray,'tag1')).toBeFalsy()    
  })

})