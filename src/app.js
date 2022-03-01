const path = require('path');
const express = require('express');

const hbs = require('hbs');

const app = express();

// Define paths for Express config
const viewPath = path.join(__dirname, '../templates/views')
const publicPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handles bars engine and views location 
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// setup static directory for serve
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Prakalpa Prakash'
    })
})

app.get('/weather', (req,res) => {
    if (!req.query.location) {
        return res.send({
            error: 'You must provide a location!'
        })
    }
    res.send({
        forecast: 'Weather',
        location: req.query.location
    })
})

app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        name: 'Prakalpa Prakash'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'some helpful text',
        name: 'Prakalpa Prakash'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 404,
        errMsg: 'Help aticle not found!',
        name: 'Prakalpa Prakash'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 404,
        errMsg: 'Page not found!',
        name: 'Prakalpa Prakash'
    })
})

//app.com
//app.com/help
//app.com/about

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
})