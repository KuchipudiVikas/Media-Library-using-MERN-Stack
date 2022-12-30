import Movielist from "../../components/movies/movies.components";
import { useState, useEffect, useContext } from 'react';
import { moviesContext } from "../../context/moviesContext";

const Home = () => {
    const { moviesList, setMoviesList, setSeriesList } = useContext(moviesContext)
    useEffect(() => {
        fetch('/movies').then(
            response => response.json()
        ).then(data => {
            setMoviesList(data)
        })

        fetch('/series').then(response => response.json()).then(data => setSeriesList(data))
    }, []);

    return (

        <div className="App">
            <Movielist movies={moviesList} />
        </div>

    );
}
export default Home;