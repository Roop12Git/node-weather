const request = require('request')

const geocode =  (address, callback) => {
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1Ijoia3NyMTU4IiwiYSI6ImNqdzU4ZTg0dDEwOXkzenFya3l1d3h2MGUifQ.mj3znEjeq1El4yM92aXxhQ'
//callback chaining
    request ({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to location services',undefined)
        }else if(body.features.length === 0){
            callback('Unable to locate,Try again',undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
           })
        }
    })
}

module.exports = geocode