const fetch = require("node-fetch");
const bodyParser = require('body-parser');
const express = require('express');
const Movie = require('./models/movies');
const mongoose = require('mongoose')
const ejsMate = require('ejs-mate')
const methodOverride = require('method-override');
const Code = require('./models/code')

mongoose.connect('mongodb://localhost:27017/mystore', {
    useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("database connected!!")
})

const app = express();
app.engine('ejs', ejsMate)
const path = require('path');
const movie = require('./models/movies');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'));
app.use(express.json())
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/', async (req, res) => {
    const movies = await Movie.find({});
    res.render('movies/index', { movies })
})

app.get('/new', (req, res) => {

    res.render('movies/new')
})

app.get('/movies', async (req, res) => {
    const movies = await Movie.find({});
    // res.render('movies/index', { movies })
    console.log(":: :: " + typeof (movies))
    console.log(movies)
    res.json(movies)
})






app.get('/movies/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    res.render('movies/show', { movie })
})




app.get('/movies/:id/edit', async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    res.render('movies/edit', { movie })
})


app.post('/movies', async (req, ress) => {
    const id = req.body['movie']['title'];
    const res = req.body['movie']['res'];
    const link = req.body['movie']['link'];
    const url = `https://mdblist.p.rapidapi.com/?i=${id}`;
    let movie = {}

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'ddd91bd90fmsh4f56c17f86db0bdp1c50acjsn11ac76127c4c',
            'X-RapidAPI-Host': 'mdblist.p.rapidapi.com'
        }
    };

    await fetch(url, options)
        .then(res => res.json())
        .then(json => {
            movie = json
        })
        .catch(err => console.error('error:' + err));
    const title = movie['title'];
    const year = movie['year'];
    const ImageUrl = movie['poster']
    const rating = movie['ratings'][0]['value'];
    const description = movie['description'];
    const d = new Movie({ title, res, year, ImageUrl, link, rating, description })
    await d.save();
    console.log(d)
    ress.redirect('/movies')
})

app.put('/movies/:id', async (req, res) => {
    const { id } = req.params;
    const movie = await Movie.findByIdAndUpdate(id, { ...req.body.movie });
    res.redirect(`/movies/${movie._id}`)
})

app.delete('/movies/:id', async (req, res) => {
    const { id } = req.params;
    await Movie.findByIdAndDelete(id);
    res.redirect('/movies')
})

app.listen(5000, (req, res) => {
    console.log("listening to port 5000")
})