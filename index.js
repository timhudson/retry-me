var retry = require('retry')
var xtend = require('xtend')

module.exports = function retryMe(fn, options, callback) {
  if (!callback && typeof options === 'function') {
    callback = options
    options = {}
  }

  var operation = retry.operation(options)

  operation.attempt(function() {
    fn(function(err, result) {
      if (operation.retry(err)) return
      callback(err, result, operation.errors())
    })
  })
}
