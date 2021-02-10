let request = require('request')


const mapboxapikey = 'pk.eyJ1Ijoic3RhcmJveTA2IiwiYSI6ImNra3kxM2drdzA2Mm4ydnA5b2c2ZmVnczAifQ.pkOUv8661y9js1RBnqkC1g'

const geocode = (address, callback) =>{
    let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapboxapikey}&limit=1`
    request({url, json: true}, (err, {body})=>{
        if (err){
            callback('unable to connect to location services', undefined)
        }else if (body.message){
            callback(body.message, undefined)
        }else if (body.features.length === 0){
            callback("no result found", undefined)
        }else{
            const data = {
                longitude : body.features[0].center[0],
                latitude : body.features[0].center[1],
                cityName: body.features[0].place_name
            }
            
            callback (err, data)
        }
    })
}


module.exports = {
    geocode
}