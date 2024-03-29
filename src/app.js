const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Abhi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Abhi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Abhi',
        msg: 'help message'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'address missing.'
        })
    }

    const loc = req.query.address
    geocode(loc, (error, {lat, long, location} = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        } else {
            forecast(lat, long, (error, {summary, string}) => {
                if (error) {
                    return res.send({
                        error: error
                    })
                }

                const forecast = summary + ' ' + string 
                res.send({
                    address: loc,
                    location: location,
                    forecast: forecast
                })
            })
        }
    })

    // res.send({
    //     address: loc,
    //     location: 'barmingay',
    //     forecast: 'rainz innit'
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Search term missing.'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help 404',
        name: 'Abhi',
        msg: 'help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Abhi',
        msg: 'page not found'
    })
})

app.listen(port, () => {
    console.log('server is up on port ' + port)
})