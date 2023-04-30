const request = require("postman-request")
require("dotenv").config()

const forecast = (latitude, longitude, callback) => {
    const forecastURL = `http://api.weatherstack.com/current?access_key=${process.env.forecastAccess}&query=${latitude},${longitude}&units=f`
    request({ url: forecastURL, json: true }, (error, response) => {
        if (error) {
            callback("low level os error", undefined)
        }
        else if (response.body.error) {
            callback("input error", undefined)
        }
        else {
            const temperature = response.body.current.temperature
            const feel = response.body.current.feelslike
            const weather = response.body.current.weather_descriptions[0]
            callback(undefined, {
                weather: weather,
                temperature: temperature,
                feel: feel
            })
        }
    })
}
module.exports = forecast