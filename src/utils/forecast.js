const request = require('request')

const forecast = (lat, long, callback) => {
    var url = 'https://api.darksky.net/forecast/823bbafbc31cc3694111dbf80bcdd985/'
    url += lat 
    url += ','
    url += long
    url += '?units=si'

    request({ url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather services', undefined)
        } else if (body.error) {
            callback('Poorly formatted request', undefined)
        } else {
            const {currently, daily} = body
            var str = 'It is currently '
            str += currently.temperature
            str += ' degrees out. There is a '
            str += currently.precipProbability
            str += '% chance of rain.'

            callback(undefined, {
                summary: daily.data[0].summary,
                string: str
            })
        }
    })
}

module.exports = forecast