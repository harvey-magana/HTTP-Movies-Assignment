import React, { useEffect, useState } from "react";
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialState = {
    title: '',
    director: '',
    metascore: '',
    stars: ['', '', '']
}

const UpdateMovie = props => {
    const [movie, setMovie] = useState(initialState);
    const { push } = useHistory();
    const { id } = useParams();

    const handleChanges = (e) => {
        setMovie({ ...movie, [e.target.name]: e.target.value });
    };

useEffect(() => {
    axios.get(`http://localhost:5000/api/movies/${id}`)
    .then(res => setMovie(res.data))
    .catch(err => console.error(err))
},[id])

    const handleSubmit = e => {
        /*
        const newMovie = {
            title: movie.title, 
            director: movie.director, 
            metascore: movie.metascore, 
            stars: [
                movie.actor1, 
                movie.actor2, 
                movie.actor3
            ]
        }
        */

        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${id}`, movie)
        .then(res => {
            //props.setMovie(res.data)
            const movieReturned = [res.data].find(item => item.id == id);
            console.log(movieReturned);
/*             props.setMovie(props.movie.map(item => {
                if(item.id === movieReturned) {
                    return movieReturned
                }
                return item
            })) */
            setMovie(movieReturned)
            //push(`/update-movie/${id}`)
            push(`/`)
        })
        .catch(err => console.error(err))
    };
    
    return (
        <div>
        <h2>Update Movie</h2>
        <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={movie.title}
            onChange={handleChanges}
          />
        </label>
        <label>
          Director:
          <input
            type="text"
            name="director"
            value={movie.director}
            onChange={handleChanges}
          />
        </label>
        <label>
          Metascore:
          <input
            type="number"
            name="metascore"
            value={movie.metascore}
            onChange={handleChanges}
          />
        </label>
        <label>
          Actor 1:
          <input
            type="text"
            name="actor1"
            value={movie.stars[0]}
            onChange={handleChanges}
          />
        </label>
        <label>
          Actor 2:
          <input
            type="text"
            name="actor2"
            value={movie.stars[1]}
            onChange={handleChanges}
          />
        </label>
        <label>
          Actor 3:
          <input
            type="text"
            name="actor3"
            value={movie.stars[2]}
            onChange={handleChanges}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
        </div>
    )
}

export default UpdateMovie;