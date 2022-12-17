import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap'
const Form = (props) => {
    const navigate = useNavigate();
    const { method, movieinfo } = props;
    const [movieInfo, setMovieInfo] = useState({})
    const [isLoading, setLoading] = useState(false);



    const HandleChange = (e) => {
        const { name, value } = e.target;
        setMovieInfo(prev => ({ ...prev, [name]: value }))
    }

    const HandleSubmit = () => {
        setLoading(true)
        if (method == 'Add') {
            axios.post('/movies', movieInfo).then(
                response => {
                    navigate(`/movies/${response.data.title}`, { state: response.data })
                }
            )
        } else {
            axios.put(`/movies/${movieinfo._id}`, movieInfo).then(
                response => {
                    navigate(`/movies/${response.data.title}`, { state: movieinfo })

                }
            )
        }
    }
    return (




        <div className="">
            <div className="row">
                <h1 className="text-center">
                    New Movie
                </h1>
                <div className="col-6 offset-3">

                    {method == 'Add' ? (
                        <div className="mb-3">
                            <label className="form-label" htmlFor="title">IMDB ID</label>
                            <input className="form-control" type="text" id="title" name='id' required />
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                        </div>) : (<div className="mb-3">
                            <label className="form-label" htmlFor="title">Name:</label>
                            <input className="form-control" type="text" id="title" name="title" onChange={HandleChange} value={movieinfo.title} required />
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                        </div>)
                    }

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
                        <label className="form-label" for="image">size</label>
                        <input className="form-control" type="text" id="image" name="link" value={movieinfo.size} required />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" for="image">Link</label>
                        <input className="form-control" type="text" id="image" name="link" value={movieinfo.link} required />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>

                    <Button
                        variant="primary"
                        disabled={isLoading}
                        onClick={HandleSubmit}
                    >
                        {isLoading ? 'Loading...' : method}
                    </Button>


                </div>
            </div>

        </div>





    )
}

export default Form;
