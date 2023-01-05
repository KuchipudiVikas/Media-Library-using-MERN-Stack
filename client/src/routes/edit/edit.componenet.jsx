import { Helmet } from 'react-helmet';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Form } from 'react-bootstrap'

const Edit = () => {
    const location = useLocation();
    const [type, setType] = useState('movies')
    const [isLoading, setLoading] = useState(false);
    const movie = location.state;
    const [seasons, setSeasons] = useState(movie.seasons)
    const navigate = useNavigate()
    const [movieinfo, setMovieinfo] = useState(movie);
    const URL = window.location.origin
    useEffect(() => {
        if (movie.seasons) {
            setType('series')
        }
    }, [])

    const handleSeasons = (e) => {
        let { name, value } = e.target;
        let temp = [...seasons]
        for (let i = 0; i < temp.length; i++) {
            if (temp[i].name == name) {
                temp[i].link = value
                setSeasons(temp)
            }
        }

    }
    const HandleSubmit = async () => {
        setMovieinfo(prev => ({ ...prev, seasons }))
        setLoading(true)
        await axios.put(`/${type}/${movie._id}`, movieinfo).then(
            response => {
                navigate(`/movies/${response.data.title}`, { state: movieinfo })

            }
        )

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovieinfo(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    return (
        <div className="">
            <Helmet>
                <title>Edit - {movie.title}</title>
                <link rel="icon" type="image/png" href={`${URL}/icons/edit.png`} sizes="20x16" />
            </Helmet>

            <div className="row">
                <h1 className="text-center">
                    Edit {movie.title}
                </h1>
                <div className="col-6 offset-3">


                    <div className="mb-3">
                        <label className="form-label" htmlFor="title">IMDB ID</label>
                        <input className="form-control" type="text" id="title" name="title" onChange={handleChange} value={movieinfo.title} required />
                        <div className="valid-feedback">
                            Looks good!
                        </div>

                    </div>
                    <>
                        <Form.Select aria-label="Default select example" name='res' className="mb-3" >
                            <option index>Resolution</option>
                            <option value="4K IMAX">4K IMAX</option>
                            <option value="1080p IMAX">1080p IMAX</option>
                            <option value="4K">4K</option>
                            <option value="1080p">1080p</option>
                            <option value="720p">720</option>
                        </Form.Select>
                    </>
                    {type == 'movies' ? (
                        <>
                            <div className="mb-3">
                                <label className="form-label" for="image">Size</label>
                                <input className="form-control" type="text" id="image" name="link" required />
                                <div className="valid-feedback">
                                    Looks good!
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="image">Link</label>
                                <input className="form-control" type="text" id="image" name="link" onChange={handleChange} value={movieinfo.link} required />
                                <div className="valid-feedback">
                                    Looks good!
                                </div>
                            </div></>) : ''
                    }




                    {
                        seasons ? (
                            seasons.map(season => {
                                return (
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="id">{season.name}</label>
                                        <input className="form-control" type="text" id="title" value={season.link} name={season.name} onChange={handleSeasons} required />
                                    </div>
                                )
                            })
                        ) : ''
                    }
                    <div className="mb-3">
                        <button
                            className='btn btn-primary'
                            onClick={HandleSubmit}
                        >
                            <i class="fa fa-edit"></i>&nbsp;&nbsp;
                            {isLoading ? 'Editing...' : 'Edit'}
                        </button>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Edit;