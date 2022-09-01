
import { useLocation } from 'react-router-dom'

const Show = () => {
    const location = useLocation();
    const movie = location.state;
    const { title, description, link, rating, res, year } = movie;
    return (
        <div className="">

            <div>
                <div><h1>
                    {movie.title}
                </h1></div>
                <a href={link}>watch</a>
                {
                    rating
                }
            </div>
        </div>
    )
}

export default Show;