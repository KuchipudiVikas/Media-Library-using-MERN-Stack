import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react'
import axios from 'axios'


const Edit = () => {
    const location = useLocation();
    const movie = location.state;
    const navigate = useNavigate()
    const { title, res, year, link } = movie;
    const [movieinfo, setMovieinfo] = useState(movie);
    const HandleSubmit = () => {
        axios.put(`/movies/${movie._id}`, movieinfo).then(
            response => {
                console.log(response.data)
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
                    <div className="mb-3">
                        <label className="form-label" htmlFor="location">Resolution</label>
                        <input className="form-control" type="text" id="location" name="res" onChange={handleChange} value={movieinfo.res} required />
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
                    </div>


                    <div className="mb-3">
                        <button className="btn btn-success" onClick={HandleSubmit}>Add</button>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Edit;