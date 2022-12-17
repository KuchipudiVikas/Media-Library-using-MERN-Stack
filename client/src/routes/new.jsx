import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'

const New = () => {
    const navigate = useNavigate();

    const titleRef = useRef();
    const resRef = useRef();
    const linkRef = useRef();
    const sizeRef = useRef();
    const HandleSubmit = () => {
        const title = titleRef.current.value
        const res = resRef.current.value
        const size = sizeRef.current.value
        const link = linkRef.current.value
        axios.post('/movies', { title, res, size, link }).then(
            response => {
                navigate(`/movies/${response.data.title}`, { state: response.data })
            }
        )
    }


    return (

        <div className="">
            <div className="row">
                <h1 className="text-center">
                    New Movie
                </h1>
                <div className="col-6 offset-3">


                    <div className="mb-3">
                        <label className="form-label" htmlFor="title">IMDB ID</label>
                        <input className="form-control" type="text" id="title" name="title" ref={titleRef} required />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>

                    <>
                        <Form.Select aria-label="Default select example" name='res' ref={resRef}>
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
                        <input className="form-control" type="text" id="image" name="link" ref={sizeRef} required />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" for="image">Link</label>
                        <input className="form-control" type="text" id="image" name="link" ref={linkRef} required />
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