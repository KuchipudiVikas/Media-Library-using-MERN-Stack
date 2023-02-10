const express = require('express')
const router = express.Router()
const Movie = require('../models/movies');
const { toRuntime, options, } = require('../helpers/functions')
const fetch = require('node-fetch')


router.get('/', async (req, res) => {
    const movies = await Movie.find({});
    res.json(movies)
})

router.post('/', async (req, ress) => {
    const { id, res, size, link, index } = req.body;
    const url = `https://mdblist.p.rapidapi.com/?i=${id}`;
    let movie = {}


    await fetch(url, options)
        .then(res => res.json())
        .then(json => {
            movie = json
        })
        .catch(err => console.error('error:' + err));

    let { title, year, description, backdrop, trailer, runtime, poster } = movie;
    console.log(movie)
    const rating = movie['ratings'][0]['value']
    runtime = toRuntime(runtime)
    const d = new Movie({ title, res, size, year, poster, backdrop, link, trailer, rating, runtime, description, index })
    await d.save();
    ress.send(d)
})

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const movie = await Movie.findByIdAndUpdate(id, { ...req.body });
    const updated = await Movie.findById(req.params.id);

    res.send(updated)
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await Movie.findByIdAndDelete(id);
})



module.exports = router