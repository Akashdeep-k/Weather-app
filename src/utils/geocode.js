const request = require("postman-request")

const geocode = (address, callback) => {
    const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYWthc2hkZWVwLWsiLCJhIjoiY2xoMjYzem14MG54bzNrcW9nZWZibTJxZCJ9.wz7XOZArg6wPYX9bFVKS9A&limit=1`;

    request({ url: geocodeURL, json: true }, (error, { body }) => {
        if (error) {
            callback("low level os error => geocode", undefined)
        }
        else if (body.features.length === 0) {
            callback("input error => geocode", undefined)
        }
        else {
            const location = body.features[0];
            const latitude = location.center[1];
            const longitude = location.center[0];
            const place = location.place_name
            callback(undefined, {
                latitude,
                longitude,
                place
            })
        }
    });
}
module.exports = geocode