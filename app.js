const environment = process.env.NODE_ENV
if (environment !== 'production') {
    require('dotenv').config()
}
const path = require('path')
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const moviesRoutes = require('./serverRoutes/movies')
const seriesRoutes = require('./serverRoutes/series')
const adminRoutes = require('./serverRoutes/admin')
const port = process.env.PORT || 5000
const cors = require('cors')



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
app.use(cors({ origin: "http://moviestore.cyclic.app" }))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "./client/build")));

app.use('/movies', moviesRoutes)
app.use('/series', seriesRoutes)
app.use('/admin', adminRoutes)




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
        console.log("listening for requests ");
    })
})