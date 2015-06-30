var scrollToTop = require('./page.scrollToTop')

var expect = require('chai').expect
var sinon = require('sinon')


describe('scrollToTop', function () {
  var exceptionPath = '/about'
  var context = {
    pathname: exceptionPath
  }
  var next = sinon.spy()

  it('calls next', function () {
    var scrollTo = sinon.stub()
    var routeInstance = scrollToTop([], scrollTo)
    expect(routeInstance(context, next)).to.be.undefined
    expect( next.called ).to.be.true
  })
  it('calls scrollTo if route matches exceptions', function (done) {
    var scrollTo = sinon.spy()
    var routeInstance = scrollToTop([exceptionPath+'-not'], scrollTo)
    expect(routeInstance(context, next)).to.be.undefined
    setTimeout(function(){
      expect( scrollTo.called ).to.be.true
      done()
    }, 1)
  })
})
