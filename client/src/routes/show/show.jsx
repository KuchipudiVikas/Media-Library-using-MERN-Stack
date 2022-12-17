import axios from 'axios'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import './show.scss'
import './show.styles.css'
const Show = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const movie = location.state;
    console.log(movie)
    const { title, description, link, backdrop, rating, res, year, ImageUrl } = movie;
    const deleteMovie = () => {
        axios.delete(`/movies/${movie._id}`).then(
            navigate('/')
        )
    }
    return (
        <div style={{ backgroundImage: `url(${backdrop})` }} className="showContainer">
            <div className="tcard">
                <div className="tcard_left">
                    <img src={ImageUrl} />
                </div>
                <div className="tcard_right">
                    <h1>{title}</h1>
                    <div className="tcard_right__details">
                        <ul>
                            <li>{year}</li>
                            <li>{res}</li>
                            <li>{rating}</li>
                        </ul>
                        <div className="tcard_right__rating">
                            <div className="tcard_right__rating__stars">

                            </div>
                        </div>
                        <div className="tcard_right__review">
                            <p>{description}</p>
                            <a href="http://www.imdb.com/title/tt0266697/plotsummary?ref_=tt_stry_pl" target="_blank">Read more</a>
                        </div>
                        <div className="buttons">
                            <div className="tcard_right__button">
                                <a href={link} target="_blank">WATCH</a>
                            </div>
                            <div className="tcard_right__button">
                                <Link to={`/movies/${movie._id}/edit`} state={movie}>Edit</Link>
                            </div>
                            <div className="tcard_right__button" onClick={deleteMovie}>
                                <Link >Delete</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>



    )
}

export default Show;


