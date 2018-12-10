const request = require('request')
const yargs = require('yargs')

const argv = yargs.argv  
.options({
    a: {
      demand: true, 
      alias: 'address',
      description: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .argv

const encodedAddress = encodeURIComponent(argv.address)
request({
  url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyBmED3bBLrIOIN2086bbwDlfgeGyq63rKU`,
  json: true
}, (error, response, body) => {
  if (error) {
    console.log('Sorry honey, unable to connect to Google')
  } else if (body.status === "ZERO_RESULTS") {
    console.log('Sorry babe, that address aint valid')
  } else if (body.status === "OK") {
  console.log(body.results[0].formatted_address)
  console.log(body.results[0].geometry.location.lat)
  console.log(body.results[0].geometry.location.lng)
  }
})

