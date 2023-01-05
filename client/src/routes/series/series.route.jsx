import { useContext, useEffect } from "react"
import Movielist from "../../components/movies/movies.components"
import { moviesContext } from "../../context/moviesContext"
import { Helmet } from "react-helmet"

const SeriesPage = () => {
    const { seriesList, setSeriesList } = useContext(moviesContext)
    let URL = window.location.origin;
    useEffect(() => {
        if (!seriesList.length) {
            fetch('/series').then(
                response => response.json()
            ).then(data => {
                setSeriesList(data);
            })
        }
    }, []);
    return (
        <>
            <Helmet>
                <title>Series</title>
                <link rel="icon" type="image/png" href={`${URL}/icons/film.png`} sizes="20x16" />
            </Helmet>
            <Movielist movies={seriesList} />
        </>
    )
}

export default SeriesPage