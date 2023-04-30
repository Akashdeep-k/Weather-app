const yargs = require("yargs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

yargs.command({
    command: '$0',
    describe: "getting forecast",
    handler: () => {
        const address = `${yargs.argv._}`
        if (!address) {
            console.log("Please provide address🙏")
        }
        else {
            geocode(address, (error, {latitude, longitude, place} = {}) => {
                if (error) {
                    return console.log(error + " => geocode")
                }

                forecast(latitude, longitude, (error, {weather, temperature, feel} = {}) => {
                    if (error) {
                        return console.log(error + " => forecast")
                    }
                    console.log(place)
                    console.log(weather, temperature, feel)
                })
            })
        }
    }
})

yargs.parse()