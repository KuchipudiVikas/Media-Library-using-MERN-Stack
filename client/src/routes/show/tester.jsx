import axios from "axios"


const Tester = () => {
    let movies = [
        'tt12422308'
    ]

    const res = '4k'
    const temp = 'temp'
    movies.forEach(async (movie) => await axios.post('/movies', { movie, res, temp }).then(
        response => {
            console.log(response)
        }
    ))
    return (
        <h1>hello</h1>
    )
}

export default Tester;