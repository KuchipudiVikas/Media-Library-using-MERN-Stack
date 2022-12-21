import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import Movielist from "../../components/movies/movies.components"

const SeriesPage = () => {
    const [shows, setShows] = useState([{}])
    useEffect(() => {
        fetch('/series').then(
            response => response.json()
        ).then(data => {
            setShows(data);

        })
    }, []);
    return (
        <Movielist movies={shows} />
    )
}

export default SeriesPage