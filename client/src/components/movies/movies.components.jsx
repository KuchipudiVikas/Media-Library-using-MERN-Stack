import { Link } from 'react-router-dom'
const Movielist = ({ movies }) => {
    return (
        <div className='MovieCards'>
            {

                movies.map((movie) => {
                    return (
                        <Link to={`/movies/${movie.title}`} state={movie}>
                            <img className="cover" src={movie.poster} alt={movie.title} />
                        </Link>
                    )
                })
            }
        </div >
    )
}

export default Movielist;