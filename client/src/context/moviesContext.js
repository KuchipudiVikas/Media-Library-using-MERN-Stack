import { createContext, useState } from "react";

export const moviesContext = createContext({});

export const MoviesProvider = ({ children }) => {

    const [moviesList, setMoviesList] = useState([]);
    const [seriesList, setSeriesList] = useState([])
    const value = {
        moviesList,
        setMoviesList,
        seriesList,
        setSeriesList
    }
    return (
        <moviesContext.Provider value={value}>{children}</moviesContext.Provider>
    )
}