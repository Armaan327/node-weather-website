const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYXJtYWFucyIsImEiOiJja29lYXIwZDQwM2t6MzBwMjd0djNxNzJmIn0.vz3u1jk4W2BEdkA9r1V_3w&limit=1'
    request({ url, json: true }, (error, {body}) => {

        if (error) {
            callback('unable to access server', undefined)
        } else if (body.features.length === 0) {
            callback('entered location is invalid, seriously do you not know how to type?!', undefined)
        } else {
            const data = {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            }


            callback(undefined, data)
        }



    })
}

module.exports = geocode

