import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from 'axios';

const initialState = {
    title: '',
    director: '',
    metascore: '',
    actor1: '',
    actor2: '',
    actor3: ''
}

const MovieForm = (props) => {
    const [movie, setMovie] = useState(initialState);
    const { push } = useHistory();

    const handleChanges = (e) => {
        setMovie({ ...movie, [e.target.name]: e.target.value });
    };

const handleSubmit = e => {
    const newMovie = {
        id: movie.id,
        title: movie.title, 
        director: movie.director, 
        metascore: movie.metascore, 
        stars: [
            movie.actor1, 
            movie.actor2, 
            movie.actor3
        ]
    }
    axios.post("http://localhost:5000/api/movies", newMovie)
        .then(res => {
            setMovie(res.data)
            //push(`/movies/${id}`)
        })
        .catch(err => {
            console.log(err.response);
        })
      };
    
    return (
        <div>
        <h2>Add Movie</h2>
        <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            name="title"
            value={movie.title}
            onChange={handleChanges}
          />
        </label>
        <label>
          Director:
          <input
            name="director"
            value={movie.director}
            onChange={handleChanges}
          />
        </label>
        <label>
          Metascore:
          <input
            name="metascore"
            value={movie.metascore}
            onChange={handleChanges}
          />
        </label>
        <label>
          Actor 1:
          <input
            name="actor1"
            value={movie.actor1}
            onChange={handleChanges}
          />
        </label>
        <label>
          Actor 2:
          <input
            name="actor2"
            value={movie.actor2}
            onChange={handleChanges}
          />
        </label>
        <label>
          Actor 3:
          <input
            name="actor3"
            value={movie.actor3}
            onChange={handleChanges}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
        </div>
    )
}

export default MovieForm;