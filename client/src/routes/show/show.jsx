import axios from 'axios'
import { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import './show.scss'
import './show.styles.css'
import Helmet from 'react-helmet'

const Show = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const [type, setType] = useState('movies')
    const movie = location.state;
    let { title, description, link, backdrop, rating, res, year, poster, seasons, index } = movie;
    const [folder, setFolder] = useState('')
    useEffect(() => {
        if (seasons) {
            setType('series')
            setFolder(seasons[0].link)
        }
    }, [])


    const handleSeason = (e) => {
        for (let i = 0; i < seasons.length; i++) {
            if (seasons[i].name == e.target.value) {
                setFolder(seasons[i].link)
            }
        }
    }

    const deleteMovie = () => {
        axios.delete(`/${type}/${movie._id}`).then(
            navigate(`/${type}`)
        )
    }
    return (

        <div style={{ backgroundImage: `url(${backdrop})` }} className="showContainer">
            <Helmet>
                <title>{title}</title>
                <meta name={title} content={title} />
                <link rel="icon" type="image/png" href={poster} sizes="20x16" />
            </Helmet>
            <div className="tcard">
                <div className="tcard_left">
                    <img src={poster} />
                </div>
                <div className="tcard_right">
                    <h1>{title}</h1>
                    <div className="tcard_right__details">
                        <ul>
                            <li>{year}</li>
                            <li>{res}</li>
                            <li>{rating}</li>
                            {
                                index ? <li>{index}</li> : ''
                            }
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
                            {seasons ? (
                                <>
                                    <Form.Select aria-label="Default select example" className='seasonform' name='res' onChange={handleSeason} >
                                        {seasons.map(season => {
                                            return (
                                                <option value={season.name}>{season.name}</option>
                                            )
                                        })
                                        }
                                    </Form.Select>

                                    <a href={folder} target="_blank"><i class="fa fa-folder fa-2x show" aria-hidden="true"></i></a>

                                </>


                            ) : (<div className="">
                                <a href={link} target="_blank"><i class="fa fa-play fa-2x show" aria-hidden="true"></i></a>
                            </div>)

                            }




                            <Link to={`/movies/${movie._id}/edit`} state={movie}><i class="fa fa-edit fa-2x show" aria-hidden="true"></i></Link>
                            <i class="fa fa-trash fa-2x show" aria-hidden="true" onClick={deleteMovie}></i>
                        </div>
                    </div>
                </div>
            </div>
        </div >




    )
}

export default Show;


