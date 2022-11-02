import { createContext, useContext, useState } from "react";

export const moviesContext = createContext({});

export const MoviesProvider = ({ children }) => {

    const [moviesList, setMoviesList] = useState([{}]);
    const value = {
        moviesList,
        setMoviesList
    }
    return (
        <moviesContext.Provider value={value}>{children}</moviesContext.Provider>
    )
}