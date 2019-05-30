const request = require('request')
const geocode  = require('./geocode')

const forecast = (latitude,longitude,callback)=>{
    const url = 'https://api.darksky.net/forecast/98e3cc4882db5227e5164153c9a75147/' + latitude +',' + longitude
   // console.log('forcast url : ', url);
    request({url, json: true}, (error,{body}) => {
        if(error){
            callback('unable to connect to weather service',null)
        }else if(body.error){
            callback('Unable to fetch location', null)
        }else{
           //console.log( body.daily.data[0]);
            callback(null, body.daily.data[0].summary+'It is currently ' + body.currently.temperature + ' degrees out. There is '+ body.currently.precipProbability + '% chances of rain with a windspeed of '+ body.currently.windSpeed +' mph' )
            }
    })


}
module.exports = forecast