const path = require('path')
const express = require('express')
const hbs = require('hbs')

let geocode = require('./utils/geocode.js')
let forcast = require('./utils/forcast')

const app = express()

const port = process.env.PORT || 3000

//paths for express
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//handlebars setup
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//static directory
app.use(express.static(publicPath))

app.get('', (req, res)=>{
    res.render('index', {
        title: 'New Title here',
        name: 'Moayad'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Moayad Elamin'
    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
        message: 'This is a help page with the help message!',
        title: 'Help',
        name: 'Moayad'
    })
})
app.get('/weather', (req, res)=>{
    const location = req.query.location
    if (!location){
        return res.send({
            error: 'Please provide an Address!'
        })
    }
    geocode.geocode(location, (error, data)=>{
        if (error){
            return res.send({
                error,})
        }
        forcast.forcast(error, data, (error, {temp, cloud, description} = {})=>{
            if (error){
                return res.send({
                    error})
            }
            const forcast = 'It is currently '+temp+' in ' + data.cityName + ', there is '+cloud+'% cloud coverage and the weather summary is ' + description 
            res.send({
                location, 
                forcast
            })
        })
    })
})


app.get('/products', (req, res)=>{
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search item'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        message: 'Help Article Not Found',
        title: '404',
        name: 'Moayad'
    })
    
})

app.get('*',(req, res)=>{
    res.render('404', {
        message: 'Page Not Found',
        title: '404',
        name: 'Moayad'
    })
})

app.listen(port, ()=>{
    console.log('it is up on port ' + port)
})