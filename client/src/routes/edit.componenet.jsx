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
            <div>
                <div><input name="title" type="text" placeholder="IMDB ID" onChange={handleChange} value={movieinfo.title} /></div>
                <div><input name="res" type="text" placeholder="Resolution" onChange={handleChange} value={movieinfo.res} /></div>
                <div><input name="link" type="text" placeholder="Link" onChange={handleChange} value={movieinfo.link} /></div>
                <div className=""><button onClick={HandleSubmit}>Add</button></div>

            </div>
        </div>
    )
}

export default Edit;