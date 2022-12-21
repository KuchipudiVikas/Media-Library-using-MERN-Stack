import Movielist from "../../components/movies/movies.components";
import { useState, useEffect, useContext } from 'react';
import { moviesContext } from "../../context/moviesContext";

const Home = () => {
    const [movies, setMovies] = useState([{}]);
    const { moviesList, setMoviesList } = useContext(moviesContext)
    console.log(movies)

    useEffect(() => {
        fetch('/movies').then(
            response => response.json()
        ).then(data => {
            setMovies(data);
            setMoviesList(data);

        })
    }, []);

    return (

        <div className="App">
            <Movielist movies={moviesList} />
        </div>

    );
}
export default Home;