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
            geocode(address, (error, data) => {
                if (error) {
                    return console.log(error + " => geocode")
                }

                forecast(data.latitude, data.longitude, (error, forecastData) => {
                    if (error) {
                        return console.log(error + " => forecast")
                    }
                    console.log(data.place)
                    console.log(forecastData)
                })
            })
        }
    }
})

yargs.parse()