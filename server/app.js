if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
console.log(process.env.secret)
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const fetch = require("node-fetch");
const bodyParser = require('body-parser');
const Movie = require('./models/movies');
const Account = require('./models/accounts');
const TorrentSearchApi = require('torrent-search-api');
// mongodb://127.0.0.1:27017/mystore'
//mongo connection
const dbUrl = process.env.DB_URL
mongoose.connect('mongodb://127.0.0.1:27017/mystore' {
    useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("database connected!!")
})

//url parsin
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//restful routes
app.get('/', async (req, res) => {
    const movies = await Movie.find({});
    res.render('movies/index', { movies })
})

app.get('/new', (req, res) => {

    res.render('movies/new')
})

app.get('/movies', async (req, res) => {
    const movies = await Movie.find({});
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
    const id = req.body.title;
    const { res, size, link } = req.body;
    const url = `https://mdblist.p.rapidapi.com/?i=${id}`;
    let movie = {}

    function convertToHoursAndMinutes(minutes) {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;

        const hoursString = hours.toString().padStart(2, '0');
        const minutesString = remainingMinutes.toString().padStart(2, '0');

        return `${hoursString}:${minutesString}`;
    }

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
    const BackDrop = movie['backdrop'];
    const runtime = convertToHoursAndMinutes(movie['runtime'])
    const trailer = movie['trailer']
    const d = new Movie({ title, res, size, year, ImageUrl, BackDrop, link, trailer, rating, runtime, description, })
    await d.save();
    ress.send(d)
})

app.get('/admin/accounts', async (req, res) => {
    const accounts = await Account.find({})
    res.send(accounts)
})

app.get('/admin/add', async (req, res) => {
    console.log('hit route')
    const providers = TorrentSearchApi.getProviders();
    TorrentSearchApi.enablePublicProviders();
    const torrents = await TorrentSearchApi.search('endgame', 'All', 20);
    console.log(torrents)
})

app.post('/admin/accounts', async (req, res) => {

    const account = new Account(req.body)
    await account.save()
    res.send('done')
})



app.put('/admin/accounts/:id', async (req, res) => {
    const { id } = req.params;
    console.log(req.body)
    const acc = await Account.findByIdAndUpdate(id, { ...req.body })
    const updated = await Account.findByIdAndUpdate(req.params.id)
    res.send(updated)


})

app.delete('/admin/accounts/:id', async (req, res) => {
    const { id } = req.params
    await Account.findByIdAndDelete(id)
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