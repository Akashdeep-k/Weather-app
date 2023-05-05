const express = require("express")
const path = require("path")
const hbs = require("hbs")

const app = express()

const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")
const publicDirectory = path.join(__dirname, "../public")

app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectory))

app.get("/", (req, res)=>{
    res.render("index", {
        title: "Weather",
        name: "akash"
    })
})

app.get("/about", (req, res)=>{
    res.render("about", {
        title: "About",
        name: "akash"
    })
})

app.get("/help", (req, res)=>{
    res.render("help", {
        title: "Help",
        msg: "Some helpful text",
        name: "akash"
    })
})

app.get("/help/*", (req, res)=>{
    res.render("404", {
        title: "error",
        name: "akash",
        errorMsg: "No help article found",
    })
})

app.get("/*", (req, res)=>{
    res.render("404", {
        title: "error",
        name: "akash",
        errorMsg: "No page found",
    })
})

const port = 3000
app.listen(port, ()=>{
    console.log(`Server listening on port ${port}...`)
})