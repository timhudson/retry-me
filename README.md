# retry-me

Single export interface to the [retry](https://www.npmjs.org/package/retry) module

[![build status](http://img.shields.io/travis/timhudson/retry-me.svg?style=flat)](http://travis-ci.org/timhudson/retry-me)

## Example

``` js
var retryMe = require('retry-me')
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
```

You can also provide retry options:

``` js
var options = {
  retries: 2,
  factor: 2,
  minTimeout: 1000,
  maxTimeout: 2000,
  randomize: true
}

retryMe(fn, options, function(err, body, errors) {
  console.log(body)
})
```

## License

MIT
