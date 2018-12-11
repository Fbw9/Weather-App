const request = require('request')
const yargs = require('yargs')

const weather = require('./weather/weather')
const geocode = require('./geocode/geocode')

const argv = yargs
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

  geocode.geocodeAddress(argv.address, (errorMessage, geocodingResults) => {
    if (errorMessage) {
      console.log(errorMessage)
    } else {
      console.log(geocodingResults.address)
      console.log(geocodingResults.latitude)
    }
  })

//734bca71df3ce034dc365f8ba7485956

//https://api.darksky.net/forecast/734bca71df3ce034dc365f8ba7485956/37.8267,-122.4233

weather.getWeather(37.8267, -122.4233, (errorMessage, weatherResults) => {
  if (errorMessage) {
    console.log(errorMessage)
  } else {
    console.log(JSON.stringify(weatherResults, undefined, 2))
  }
})