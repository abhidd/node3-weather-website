const request = require('request')

const geocode = (address, callback) => {
    var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
    url += encodeURIComponent(address) 
    url += '.json?access_token=pk.eyJ1IjoidW5pb25kZXZlbG9wIiwiYSI6ImNrMzFyZzE3aTBiOGczY28yeXU2eGpsMnoifQ.VTQASlpuqnSvfbNaH05EUQ&limit=1'

    request({ url, json: true}, (error, response) => {
        const { features } = response.body
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (features.length === 0) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                lat: features[0].center[1],
                long: features[0].center[0],
                location: features[0].place_name
            })
        }
    })
}

module.exports = geocode