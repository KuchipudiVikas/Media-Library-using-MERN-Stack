import { useEffect } from "react";
import { useState } from "react";
import './app.css'

const App = () => {
  const [movies, setMovies] = useState([{}]);


  useEffect(() => {
    fetch('/movies').then(
      response => response.json()
    ).then(data => {
      setMovies(data)
      console.log(data)

    })
  }, []);


  return (
    <div className="App">
      <h1>this is homepage </h1>
      {
        movies.map((movie) => {
          return (
            <a href={`/movies/${movie._id}`}>
              <img className="cover" src={movie.ImageUrl} alt={movie.title} />
            </a>
          )
        })
      }
    </div>
  );
}

export default App;
