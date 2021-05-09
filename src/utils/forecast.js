const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=34e3a234e70a5df7bbc3aaea80e9ef25&query=' + latitude + ',' + longitude + '&units=m'
    request({url, json:true}, (error, {body}) => {
        if(error){
            callback('unable to access server',undefined)
        } else if(body.error){
            callback('entered data is invalid', undefined)
        } else {
            const temperature = body.current.temperature
            const feelslike = body.current.feelslike
            const description = body.current.weather_descriptions[0]
            callback(undefined, {
                temperature,
                feelslike,
                description
            })
        }


    })

}


module.exports = forecast