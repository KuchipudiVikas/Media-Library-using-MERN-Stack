import { useState } from "react";
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const New = () => {
    const navigate = useNavigate();
    const [movieinfo, setMovieinfo] = useState({ title: '', res: '', link: '' });
    const HandleSubmit = () => {
        axios.post('/movies', movieinfo).then(
            response => {
                console.log(response.data.title)
                navigate(`/movies/${response.data.title}`, { state: response.data })

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
                    New Movie
                </h1>
                <div className="col-6 offset-3">


                    <div className="mb-3">
                        <label className="form-label" for="title">IMDB ID</label>
                        <input className="form-control" type="text" id="title" name="title" onChange={handleChange} required />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" for="location">Resolution</label>
                        <input className="form-control" type="text" id="location" name="res" onChange={handleChange} required />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" for="image">Link</label>
                        <input className="form-control" type="text" id="image" name="link" onChange={handleChange} required />
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

export default New;