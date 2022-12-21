const environment = process.env.NODE_ENV
if (environment !== 'production') {
    require('dotenv').config()
}
const path = require('path')
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const fetch = require("node-fetch");
const bodyParser = require('body-parser');
const Movie = require('./models/movies');
const Account = require('./models/accounts');
const { toRuntime, options, } = require('./helpers/functions')
const port = process.env.PORT || 5000
const cors = require('cors')
const Series = require('./models/series')


const dbUrlLocal = 'mongodb://127.0.0.1:27017/mystore'
const dbUrlAtlas = process.env.DB_URL

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(dbUrlAtlas);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}



app.use(cors({ origin: "http:localhost:3000" }))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, "./client/build")));


app.get('/movies', async (req, res) => {
    const movies = await Movie.find({});
    res.json(movies)
})

app.get('/series', async (req, res) => {
    const series = await Series.find({});
    res.json(series)
})

app.get('/seasons/:id', async (req, res) => {
    const { id } = req.params;
    let movie = {}

    const url = `https://mdblist.p.rapidapi.com/?i=${id}`;
    await fetch(url, options)
        .then(res => res.json())
        .then(json => {
            const { seasons } = json
            let count = seasons[seasons.length - 1].season_number;
            res.send({ count })
        })
        .catch(err => console.error('error:' + err));


})


app.post('/movies', async (req, ress) => {
    const { id, res, size, link } = req.body;
    const url = `https://mdblist.p.rapidapi.com/?i=${id}`;
    let movie = {}


    await fetch(url, options)
        .then(res => res.json())
        .then(json => {
            movie = json
        })
        .catch(err => console.error('error:' + err));

    let { title, year, description, backdrop, trailer, runtime, poster } = movie;

    const rating = movie['ratings'][0]['value']
    runtime = toRuntime(runtime)
    const d = new Movie({ title, res, size, year, poster, backdrop, link, trailer, rating, runtime, description, })
    await d.save();
    ress.send(d)
})

app.post('/series', async (req, ress) => {
    const { id, res, seasons } = req.body;
    console.log(req.body)
    const url = `https://mdblist.p.rapidapi.com/?i=${id}`;
    let series = {}
    await fetch(url, options)
        .then(res => res.json())
        .then(json => {
            series = json
        })
        .catch(err => console.error('error:' + err));

    let { title, year, description, backdrop, trailer, poster, } = series;

    const rating = series['ratings'][0]['value']
    const show = new Series({ title, res, year, poster, backdrop, trailer, rating, description, seasons })
    await show.save()
    ress.send(show)
})

app.get('/admin/accounts', async (req, res) => {
    const accounts = await Account.find({})
    res.send(accounts)
})

app.get('/admin/add', async (req, res) => {
    console.log('hit route')
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

app.put('/series/:id', async (req, res) => {
    const { id } = req.params;
    const movie = await Series.findByIdAndUpdate(id, { ...req.body });
    const updated = await Series.findById(req.params.id);

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


app.delete('/series/:id', async (req, res) => {
    const { id } = req.params;
    await Series.findByIdAndDelete(id);
})
if (environment == 'production') {
    app.get("*", function (_, res) {
        res.sendFile(
            path.join(__dirname, "./client/build/index.html"),
            function (err) {
                res.status(500).send(err);
            }
        );
    });
}


connectDB().then(() => {
    app.listen(port, () => {
        console.log("listening for requests");
    })
})