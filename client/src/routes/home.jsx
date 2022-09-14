import Movielist from "../components/movies/movies.components";
import { useState, useEffect } from 'react';

const Home = () => {
    const [movies, setMovies] = useState([{}]);

    useEffect(() => {
        fetch('/movies').then(
            response => response.json()
        ).then(data => {
            setMovies(data)
        })
    }, []);

    return (


        <div className="App">
            <Movielist movies={movies} />
        </div>

    );
}
export default Home;