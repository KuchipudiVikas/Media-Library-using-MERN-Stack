import { useState } from "react";

const New = () => {
    const [movieinfo, setMovieinfo] = useState({ title: '', res: '', link: '' });
    return (
        <div>
            <form action="/movies" method="post">
                <div><input type="text" placeholder="IMDB ID" /></div>
                <div><input type="text" placeholder="Resolution" /></div>
                <div><input type="text" placeholder="Link" /></div>
            </form>
        </div>
    )
}

export default New;