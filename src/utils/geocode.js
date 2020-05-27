const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoic2lkZGhhcnRoLTk5IiwiYSI6ImNrNTk2b21kdzBpbmQzZHJmNjIxa3VubzAifQ.__vnH6jooxYD0A06KdV4Zw&limit=1'

    request({ url: url, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect to a network', undefined)
        }else if(response.body.features.length == 0){
            callback('Location not found', undefined)
        }else{
            const data = {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            }
            callback(undefined, data)
        }
    })
}

module.exports = geocode