
const axios = require('axios')
let movies = [

    'tt9179430',
    'tt9263550'
]

const res = '4k'
const temp = 'temp'
movies.forEach(async (movie) => await axios.post('/movies', { movie, res, temp }).then(
    response => {
        console.log(response)
    }
))