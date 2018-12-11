const request = require('request')

const getWeather = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/734bca71df3ce034dc365f8ba7485956/${lat},${lng}`,
        json: true }, (error, response, body) => {
          if (error) {
            callback('There is a problem with the weather API')
          } else if (body.code === 400) {
            callback(body.error)
          } else { 
              callback(undefined, {
                  temperature: body.currently.temperature,
                  summary: body.currently.summary
              })
          }
      })
}

module.exports.getWeather = getWeather