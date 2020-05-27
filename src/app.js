const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const path = require('path')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const hbs = require('hbs')

const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views') 
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicPath))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Siddharth'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'NO ADDRESS PROVIDED'
        })
    }
    // WHEN ADDRESS IS PROVIDED
    geocode(req.query.address, (error, {latitude,longitude,location} = {}) => {
        if(error){
            return res.send({
                error: error
            })
        }
        // WHEN PROPER GEODATA IS FETCHED
        // SENDING LOCATION TO WEATHERSTACK

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error: error
                })
            }
            //const {location, temperature, description} = forecastData
            res.send({
                place: location,
                temperature: forecastData.temperature,
                forecast: forecastData.forecast
            })
        })
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Siddharth'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Siddharth',
        contact: '7454595629',
        email: 'siddharthkesharwani99@gmail.com',
        text: 'Hope you had a pleasant experience on our application. For any queries/help feel free to contact.'
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        errorType: 'Help article not available'
    })
})

app.get('/*', (req, res) => {
    res.render('error', {
        title: 'Oops , something went wrong !',
        errorType: '404 : Page Not Found'
    })
})

app.listen(port, () => {
    console.log('Server Started at Port '+port)
})