const express = require('express');
const app = express();
const mongoose = require('mongoose')
const fetch = require("node-fetch");
const bodyParser = require('body-parser');
const Movie = require('./models/movies');
const movies = require('./models/movies');

//mongo connection
mongoose.connect('mongodb://localhost:27017/mystore', {
    useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("database connected!!")
})

//url parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(bodyParser.json())
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))

//restful routes
app.get('/', async (req, res) => {
    const movies = await Movie.find({});
    res.render('movies/index', { movies })
})



app.get('/movies', async (req, res) => {
    const movies = await Movie.find({});
    res.json(movies)

})

// app.get('/movies/:id', async (req, res) => {
//     const movie = await Movie.findById(req.params.id);
//     res.render('movies/show', { movie })
// })

app.get('/movies/:id/edit', async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    res.render('movies/edit', { movie })
})


app.post('/movies', async (req, ress) => {
    const id = req.body.title;
    const res = req.body.res;
    const link = req.body.link;
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
        .catch(err => console.error('error:' + err))

    const title = movie['title'];
    const year = movie['year'];
    const ImageUrl = movie['poster']
    const BackDrop = movie['backdrop']
    const rating = movie['ratings'][0]['value'];
    const description = movie['description'];
    console.log(movie)
    let keyWords = title + year + res
    if (movie.keywords) {
        if (movie.keywords.length > 25) {
            movie.keywords = movie.keywords.slice(0, 25)
        }
        movie.keywords.forEach(key => {
            keyWords = keyWords + key.name
        });
    }
    const d = new Movie({ id, title, res, year, ImageUrl, BackDrop, link, rating, description, keyWords })
    await d.save();
    console.log(d)
    ress.send(d)
})

app.put('/movies/:id', async (req, res) => {
    const { id } = req.params;
    const movie = await Movie.findByIdAndUpdate(id, { ...req.body });
    const updated = await Movie.findById(req.params.id);
    res.send(updated)
})

app.delete('/movies/:id', async (req, res) => {
    const { id } = req.params;
    await Movie.findByIdAndDelete(id);
})


app.listen(5000, (req, res) => {
    console.log("listening to port 5000")
})