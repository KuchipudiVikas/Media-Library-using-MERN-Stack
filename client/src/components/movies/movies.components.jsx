import { Link } from 'react-router-dom'
const Movielist = ({ movies }) => {
    return (
        <div>
            {

                movies.map((movie) => {
                    return (
                        <Link to={`/movies/${movie.title}`} state={movie}>
                            <img className="cover" src={movie.ImageUrl} alt={movie.title} />
                        </Link>
                    )
                })
            }
        </div >
    )
}

export default Movielist;