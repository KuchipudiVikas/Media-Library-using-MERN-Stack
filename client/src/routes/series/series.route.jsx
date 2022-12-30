import { useContext, useEffect } from "react"
import Movielist from "../../components/movies/movies.components"
import { moviesContext } from "../../context/moviesContext"

const SeriesPage = () => {
    const { seriesList, setSeriesList } = useContext(moviesContext)
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
        <Movielist movies={seriesList} />
    )
}

export default SeriesPage