import Movielist from "../../components/movies/movies.components";
import { useEffect, useContext } from 'react';
import { moviesContext } from "../../context/moviesContext";
import Helmet from "react-helmet";
import MovieAccordion from "../../components/accordion/accordion.component";
const Home = () => {
    const { moviesList, setMoviesList, setSeriesList } = useContext(moviesContext)
    let URL = window.location.origin;
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
            <Helmet>
                <title>Movie Store</title>
                <link rel="icon" type="image/png" href={`${URL}/icons/film.png`} sizes="20x16" />
            </Helmet>
            <Movielist movies={moviesList} />
            <MovieAccordion />
        </div>

    );
}
export default Home;