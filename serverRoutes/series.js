const express = require('express')
const router = express.Router()
const fetch = require("node-fetch");
const { options, } = require('../helpers/functions')
const Series = require('../models/series')

router.get('/', async (req, res) => {
    const series = await Series.find({});
    res.json(series)
})

router.get('/:id', async (req, res) => {
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



router.post('/', async (req, ress) => {
    const { id, res, seasons } = req.body;
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

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const movie = await Series.findByIdAndUpdate(id, { ...req.body });
    const updated = await Series.findById(req.params.id);

    res.send(updated)
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await Series.findByIdAndDelete(id);
})

module.exports = router
