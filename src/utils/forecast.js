const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const query = latitude+','+longitude
    const url = 'http://api.weatherstack.com/current?access_key=0f06a54443b5559c6f18be64f95f0b26&query=' + query

    request({ url: url, json: true}, (error, response) => {
        if(error){
            callback('Not able to connect to a network', undefined)
        }else if(response.body.error){
            callback('Location not found', undefined)
        }else{
            const data = {
                location: response.body.location.name,
                temperature: response.body.current.temperature,
                description: response.body.current.weather_descriptions[0],
                forecast: 'Its '+response.body.current.weather_descriptions[0]+' ,temperature is '+response.body.current.temperature+' degrees in here'
            }
            callback(undefined, data)
        }
    })
}

module.exports = forecast