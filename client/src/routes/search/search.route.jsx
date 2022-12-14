import { useState } from "react";
import { useContext } from "react";
import { moviesContext } from "../../context/moviesContext";
import Movielist from "../../components/movies/movies.components";
const Search = () => {
    const [query, setQuery] = useState('');
    const handleChange = e => {
        setQuery(e.target.value);
    }
    const { moviesList } = useContext(moviesContext);


    const filteredMovies = moviesList.filter(movie => {
        return movie.title.toLowerCase().includes(query.toLowerCase())
    })
    return (
        <div>
            <div className="search">
                <input type="search" placeholder="search movies" onChange={handleChange} />
            </div>
            <Movielist movies={filteredMovies} />
        </div>


    )
}

export default Search;