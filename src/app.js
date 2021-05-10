const { response } = require('express')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const path = require('path')



const app = express()
const port = process.env.PORT || 3000
// Define paths for Express config
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
    res.render('index.hbs', {

        title: 'Weather',
        name: 'Armaan'
        
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: 'About page',
        name: 'armaan'
    })
})

app.get('/help', (req, res) => {
    res.render('help.hbs', {
        title: 'help page',
        name: 'Armaan',
        message: 'What do you need help for..... just enter the location and you get the weather'
    })
})


app.get('/weather', (req, res) => {
    
    if(!req.query.address){
        return res.send({
            error: 'must provide address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })   
})


app.get('/help/*', (req, res) => {
    res.render('404page.hbs',{
        title: 'error 404',
        error: 'Help article not found',
        name: 'armaan'
    })
})

app.get('*', (req,res) => {
    res.render('404page.hbs', {
        title: 'error 404',
        error: 'Page not found',
        name: 'armaan'
    })
})


app.listen(port, ()=>{
    console.log('server is up on port ' + port)
})