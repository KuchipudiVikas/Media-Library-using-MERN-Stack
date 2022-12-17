import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react'
import axios from 'axios'
import { Form } from 'react-bootstrap'

const Edit = () => {
    const location = useLocation();
    const movie = location.state;
    const navigate = useNavigate()
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
                    <>
                        <Form.Select aria-label="Default select example" name='res' >
                            <option index>Resolution</option>
                            <option value="4K IMAX">4K IMAX</option>
                            <option value="1080p IMAX">1080p IMAX</option>
                            <option value="4K">4K</option>
                            <option value="1080p">1080p</option>
                            <option value="720p">720</option>
                        </Form.Select>
                    </>
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