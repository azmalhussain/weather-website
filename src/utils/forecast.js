const request = require("request")

const key = "79683baca6b84807f383e712c71624d8"

const forecast = (lon, lat, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`
    
    request({url, json:true}, (error, response) => {
        if(error){
            callback("NO INTERNET CONNECTION!")
        }
        else if(response.body.message){
            callback("Unable to find location. Try another search!")
        }
        else{
            const temp = response.body.main.temp
            const humid = response.body.main.humidity
            const desc = response.body.weather[0].description
            const name = response.body.name
            callback(undefined ,{
                name,
                forecast : `The weather is ${desc} with a temperature of ${temp} degrees and humidity of ${humid}%`
            })
        }
    })
}

module.exports = forecast