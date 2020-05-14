const path = require("path")
const express = require("express")
const hbs = require("hbs")

const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()
const port = process.env.PORT || 3000

// define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App"
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: "About Page"
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: "Help Page"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.city){
        return res.send({
            Error: "No city name provided"
        })
    }

    geocode(req.query.city, (error, {lon, lat} = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(lon, lat, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            return res.send(forecastData)
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('error',{
        message: "Help article Not Found"
    })
})

app.get('*', (req, res) => {
    res.render('error',{
        message: "Page Not Found"
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})
