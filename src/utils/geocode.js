const request = require("request")

const geocode = (address, callback) => {
    const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYnVua2VycGFudGhlciIsImEiOiJja2ExODdoZnEwdzJhM25wNmVhdDRrazhwIn0.YdQJRI1T1pCPi9rvt93Raw&limit=1`
    
    request({url:geocodeURL, json:true}, (error, response) => {
        if(error){
            callback("NO INTERNET CONNECTION!")
        }
        else if(response.body.features.length === 0){
            callback("unable to find location. Try another search!")
        }
        else{        
            const lon = response.body.features[0].center[0]
            const lat = response.body.features[0].center[1]
            //const place = response.body.features[0].place_name
            callback(undefined, {lon, lat})
        }  
    })
}

module.exports = geocode