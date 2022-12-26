import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import './new.styles.css'

const New = () => {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [seasons, setSeasons] = useState([])
    const [info, setInfo] = useState({})
    const [type, setType] = useState('movies')
    const [seasonsCount, setSeasonsCount] = useState([])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInfo(prev => ({ ...prev, [name]: value }))
    }
    const handleSeasons = (e) => {
        let { name, value } = e.target;
        let obj = {
            name: name,
            link: value
        }
        let temp = [...seasons]
        for (let i = 0; i < temp.length; i++) {
            if (temp[i].name == name) {
                temp[i].link = value
                setSeasons(temp)
                return
            }
        }
        setSeasons(prev => [...prev, obj])


    }

    const getSeasons = async () => {
        setLoading(true)
        await fetch(`/seasons/${info.id}`).then(response => response.json()).then(json => {
            let temp = []
            for (let i = 1; i <= json.count; i++) temp.push(i)
            setSeasonsCount(temp)
            setLoading(false)
        })
    }
    const HandleSubmit = () => {
        setLoading(true)
        axios.post(`/${type}`, { ...info, seasons: seasons }).then(
            response => {
                const state = { ...response.data, type }
                navigate(`/${type}/${response.data.title}`, { state: response.data })
            }
        )
    }




    return (

        <div className="">
            <div className="row">
                <h1 className="text-center mt-10">
                    New {type == 'movies' ? 'Movie' : 'Show'}
                </h1>
                <div className="col-6 offset-3">
                    <div className="mb-3">
                        <Form.Select aria-label="Default select example mb-3" onChange={e => setType(e.target.value)} >
                            <option index value="movies"> Movie</option>
                            <option value="series">series</option>
                        </Form.Select>
                    </div>


                    <div className="mb-3">
                        <label className="form-label" htmlFor="id">IMDB ID</label>
                        <input className="form-control" type="text" id="title" name="id" onChange={handleChange} required />
                        <div className="valid-feedback">
                            Looks good!
                        </div>

                    </div>

                    <>
                        <Form.Select aria-label="Default select example" name='res' onChange={handleChange} >
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
                                <label className="form-label" for="image">size</label>
                                <input className="form-control" type="text" id="image" name="link" onChange={handleChange} required />
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
                        </>) : ''
                    }
                    {
                        seasonsCount.map(season => {
                            return (
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="id">Season {season}</label>
                                    <input className="form-control" type="text" id="title" name={`season${season}`} onChange={handleSeasons} required />
                                </div>
                            )
                        })
                    }
                    {type == 'movies' || seasonsCount.length != 0 ?
                        (<button
                            className='btn btn-success newBtn'
                            onClick={HandleSubmit}
                        >
                            <i class="fa fa-plus"></i>&nbsp;&nbsp;
                            {isLoading ? 'Adding…' : 'Add'}
                        </button>) : ''
                    }
                    {type == 'series' && seasonsCount.length == 0 ? (

                        <button
                            className='btn btn-primary newBtn'
                            onClick={getSeasons}
                        >
                            <i class="fa fa-exchange" aria-hidden="true"></i>&nbsp;&nbsp;
                            {isLoading ? 'Getting...' : 'Get Seasons'}
                        </button>) : ''
                    }




                </div>
            </div>

        </div>



    )
}

export default New; 