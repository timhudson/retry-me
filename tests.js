var test = require('tape')
var retryMe = require('./')

test('retry-me', function(t) {
  t.plan(2)

  var i = 0
  var fn = function(callback) {
    if (i++ < 9) return callback(new Error('GLURPP'))
    callback(null, 'BIFF')
  }

  var options = {retries: 10, minTimeout: 0, maxTimeout: 0}

  retryMe(fn, options, function(err, result, errors) {
    t.equal(errors.length, 9, 'retries on error')
    t.equal(result, 'BIFF', 'passes result when successful')
  })
})

test('options optional', function(t) {
  t.plan(1)

  var fn = function(callback) {
    callback(null, 'RAKKK')
  }

  retryMe(fn, function(err, result) {
    t.equal(result, 'RAKKK')
  })
})
