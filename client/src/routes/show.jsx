
import { useLocation } from 'react-router-dom'
import './show.css'
const Show = () => {
    const location = useLocation();
    const movie = location.state;
    const { title, description, link, rating, res, year, ImageUrl } = movie;
    return (

        <div className="card">
            <div className="card_left">
                <img src={ImageUrl} />
            </div>
            <div className="card_right">
                <h1>{title}</h1>
                <div className="card_right__details">
                    <ul>
                        <li>{year}</li>
                        <li>{rating}</li>
                        <li>Action</li>
                    </ul>
                    <div className="card_right__rating">
                        <div className="card_right__rating__stars">
                            <fieldset className="rating">
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
                            </fieldset>
                        </div>
                    </div>
                    <div className="card_right__review">
                        <p>{description}</p>
                        <a href="http://www.imdb.com/title/tt0266697/plotsummary?ref_=tt_stry_pl" target="_blank">Read more</a>
                    </div>
                    <div className="card_right__button">
                        <a href={link} target="_blank">WATCH MOVIE</a>
                    </div>
                </div>
            </div>
        </div>


        // <div className="">

        //     <div>

        //         <div className="poster">
        //             <img src={movie.ImageUrl} />
        //         </div>
        //         <div className="movie-body">
        //             <h2>{movie.title}</h2>
        //         </div>
        //         <button><a href={link}>watch</a></button>
        //     </div>
        // </div>
    )
}

export default Show;