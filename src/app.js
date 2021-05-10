const { response } = require('express')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')



const app = express()
const port = process.env.port || 3000

app.use(express.static('/Users/Armaan/Desktop/node-course/web-server/public'))   

app.set('view engine', 'hbs')
app.set('views', '/Users/Armaan/Desktop/node-course/web-server/templates/views')

hbs.registerPartials('/Users/Armaan/Desktop/node-course/web-server/templates/partials')

app.get('', (req, res) => {
    res.render('index', {

        title: 'Weather',
        name: 'Armaan'
        
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'armaan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
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
    res.render('404page',{
        title: 'error 404',
        error: 'Help article not found',
        name: 'armaan'
    })
})

app.get('*', (req,res) => {
    res.render('404page', {
        title: 'error 404',
        error: 'Page not found',
        name: 'armaan'
    })
})


app.listen(port, ()=>{
    console.log('server is up on port ' + port)
})