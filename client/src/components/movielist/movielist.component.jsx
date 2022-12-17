import { useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { useContext } from "react";
import { moviesContext } from "../context/moviesContext";

const MovieList = () => {
    const [movies, setMovies] = useState([{}]);
    const { moviesList, setMoviesList } = useContext(moviesContext)
    useEffect(() => {
        fetch('/movies').then(
            response => response.json()
        ).then(data => {

            setMoviesList(data);

        })
    }, []);
    return (
        <div className="movielist-admin">
            {
                moviesList.map((movie) => (
                    <ListGroup.Item>{movie.title}</ListGroup.Item>
                ))
            }
        </div>
    )
}