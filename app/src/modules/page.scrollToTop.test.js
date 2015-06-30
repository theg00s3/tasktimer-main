var scrollToTop = require('./page.scrollToTop')

var expect = require('chai').expect
var sinon = require('sinon')


describe('scrollToTop', function () {
  var context = {
    pathname: '/about'
  }
  var next = sinon.spy()

  it('calls next', function () {
    var scrollTo = sinon.spy()
    var routeInstance = scrollToTop([], scrollTo)
    expect(routeInstance(context, next)).to.be.undefined
    expect( next.called ).to.be.true
  })
})
