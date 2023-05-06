const request = require("postman-request")

const forecast = (latitude, longitude, callback) => {
    const forecastURL = `http://api.weatherstack.com/current?access_key=87c7265382554e4d43b1cfc5fa020352&query=${latitude},${longitude}`
    request({ url: forecastURL, json: true }, (error, { body }) => {
        if (error) {
            callback("low level os error => forecast", undefined)
        }
        else if (body.error) {
            callback("input error => forecast", undefined)
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