var retryMe = require('./')
var request = require('request')

var fn = function(callback) {
  request('http://bluthipsum.com', function(err, res, body) {
    if (!err && res.statusCode !== 200) {
      err = new Error('Request failed with ' + res.statusCode)
    }
    callback(err, body)
  })
}

retryMe(fn, function(err, body, errors) {
  console.log(body)
})
