const axios = require('axios')
const yargs = require('yargs')

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

const encodedAddress = encodeURIComponent(argv.address)
const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyBmED3bBLrIOIN2086bbwDlfgeGyq63rKU`

axios.get(geocodeUrl).then((response) => {
  if (response.data.status === "ZERO_RESULTS") {
    throw new Error('Unable to find that address')
  } 
  let lat = response.data.results[0].geometry.location.lat
  let lng = response.data.results[0].geometry.location.lng
  console.log(response.data.results[0].formatted_address)
  const weatherUrl = `https://api.darksky.net/forecast/734bca71df3ce034dc365f8ba7485956/${lat},${lng}`
  console.log(lng)
  return axios.get(weatherUrl)
}).then((response) => {
  let temp = response.data.currently.temperature
  let sum = response.data.currently.summary
  console.log(`Today is ${sum}. The temperature is ${Number(((temp - 32) / 1.8).toFixed(2))} degrees Celsius`)
}).catch((error) => {
  console.log(error.message)
})
