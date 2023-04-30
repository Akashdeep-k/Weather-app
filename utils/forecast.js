const request = require("postman-request")
require("dotenv").config()

const forecast = (latitude, longitude, callback) => {
    const forecastURL = `http://api.weatherstack.com/current?access_key=${process.env.forecastAccess}&query=${latitude},${longitude}&units=f`
    request({ url: forecastURL, json: true }, (error, { body }) => {
        if (error) {
            callback("low level os error", undefined)
        }
        else if (body.error) {
            callback("input error", undefined)
        }
        else {
            const temperature = body.current.temperature
            const feel = body.current.feelslike
            const weather = body.current.weather_descriptions[0]
            callback(undefined, {
                weather,
                temperature,
                feel
            })
        }
    })
}
module.exports = forecast