const express = require("express")
const path = require("path")
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()

const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")
const publicDirectory = path.join(__dirname, "../public")

app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectory))

app.get("/", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "akash"
    })
})

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            success: "false",
            error: "Please provide address to see the forecast"
        })
    }

    const address = req.query.address
    geocode(address, (error, {latitude, longitude, place} = {}) => {
        if (error) {
            return res.send({
                success: "false",
                error
            })
        }

        forecast(latitude, longitude, (error, forecastData)=>{
            if (error) {
                return res.send({
                    success: "false",
                    error
                })
            }

            res.send({
                success: true,
                forecast: forecastData,
                location: place

            })
        })
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        name: "akash"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        msg: "Some helpful text",
        name: "akash"
    })
})

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "error",
        name: "akash",
        errorMsg: "No help article found",
    })
})

app.get("/*", (req, res) => {
    res.render("404", {
        title: "error",
        name: "akash",
        errorMsg: "No page found",
    })
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server listening on port ${port}...`)
})