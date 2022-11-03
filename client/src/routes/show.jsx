import axios from 'axios'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import './show.scss'
import './show/show.styles.css'
const Show = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const movie = location.state;
    console.log(movie)
    const { title, description, link, BackDrop, rating, res, year, ImageUrl } = movie;
    const deleteMovie = () => {
        axios.delete(`/movies/${movie._id}`).then(
            navigate('/')
        )
    }
    console.log(BackDrop)
    return (
        <div style={{ backgroundImage: `url(${BackDrop})` }} className="showContainer">
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
            {/* <div className="" style={{ height: 'px', width: '100px' }}> */}

        </div>
        // </div >


    )
}

export default Show;






{/* <fieldset className="rating">
                                <input id="star10" name="rating" type="radio" value="10" />
                                <label className="full" htmlFor="star10" title="10 stars"></label>
                                <input id="star9half" name="rating" type="radio" value="9 and a half" />
                                <label className="half" htmlFor="star9half" title="9.5 stars"></label>
                                <input id="star9" name="rating" type="radio" value="9" />
                                <label className="full" htmlFor="star9" title="9 stars"></label>
                                <input id="star8half" name="rating" type="radio" value="8 and a half" />
                                <label className="half" htmlFor="star8half" title="8.5 stars"></label>
                                <input id="star8" name="rating" type="radio" value="8" />
                                <label className="full" htmlFor="star8" title="8 stars"></label>
                                <input id="star7half" name="rating" type="radio" value="7 and a half" />
                                <label className="half" htmlFor="star7half" title="7.5 stars"></label>
                                <input id="star7" name="rating" type="radio" value="7" />
                                <label className="full" htmlFor="star7" title="7 stars"></label>
                                <input id="star6half" name="rating" type="radio" value="6 and a half" />
                                <label className="half" htmlFor="star6half" title="6.5 stars"></label>
                                <input id="star6" name="rating" type="radio" value="6" />
                                <label className="full" htmlFor="star6" title="6 star"></label>
                                <input id="star5half" name="rating" type="radio" value="5 and a half" />
                                <label className="half" htmlFor="star5half" title="5.5 stars"></label>
                                <input id="star5" name="rating" type="radio" value="5" />
                                <label className="full" htmlFor="star5" title="5 stars"></label>
                                <input id="star4half" name="rating" type="radio" value="4 and a half" />
                                <label className="half" htmlFor="star4half" title="4.5 stars"></label>
                                <input id="star4" name="rating" type="radio" value="4" />
                                <label className="full" htmlFor="star4" title="4 stars"></label>
                                <input id="star3half" name="rating" type="radio" value="3 and a half" />
                                <label className="half" htmlFor="star3half" title="3.5 stars"></label>
                                <input id="star3" name="rating" type="radio" value="3" />
                                <label className="full" htmlFor="star3" title="3 stars"></label>
                                <input id="star2half" name="rating" type="radio" value="2 and a half" />
                                <label className="half" htmlFor="star2half" title="2.5 stars"></label>
                                <input id="star2" name="rating" type="radio" value="2" />
                                <label className="full" htmlFor="star2" title="2 stars"></label>
                                <input id="star1half" name="rating" type="radio" value="1 and a half" />
                                <label className="half" htmlFor="star1half" title="1.5 stars"></label>
                                <input id="star1" name="rating" type="radio" value="1" />
                                <label className="full" htmlFor="star1" title="1 star"></label>
                                <input id="starhalf" name="rating" type="radio" value="half" />
                                <label className="half" htmlFor="starhalf" title="0.5 stars"></label>
                            </fieldset> */}