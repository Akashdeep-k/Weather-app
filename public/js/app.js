console.log("Client side js is loaded")

const weatherForm = document.querySelector("form")
const searchElement = document.querySelector("input")
const locationElement = document.querySelector("#location")
const forecastElement = document.querySelector("#forecast")

weatherForm.addEventListener("submit", (e)=>{
    locationElement.textContent = "...loading"
    forecastElement.textContent = ""

    e.preventDefault()
    const address = searchElement.value

    fetch(`/weather?address=${address}`)
    .then(response=>{
        response.json().then((data)=>{
            if(data.error){
                locationElement.textContent = data.error
            }
            else{
                const {location, forecast} = data
                locationElement.textContent = location
                forecastElement.textContent = "Outlook: " + forecast.weather + ", Temperature: " + forecast.temperature + ", Feels like Temperature: " + forecast.feel 
            }
        })
    })
})