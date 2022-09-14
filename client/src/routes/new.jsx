import { useState } from "react";
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom'

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
        <div>
            <div><input name="title" type="text" placeholder="IMDB ID" onChange={handleChange} /></div>
            <div><input name="res" type="text" placeholder="Resolution" onChange={handleChange} /></div>
            <div><input name="link" type="text" placeholder="Link" onChange={handleChange} /></div>
            <div className=""><button onClick={HandleSubmit}>Add</button></div>

        </div>
    )
}

export default New;