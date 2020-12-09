import React, { useState } from "react";
import axios from 'axios';

const initialState = {
    title: '',
    director: '',
    metascore: '',
    stars: []
}

const MovieForm = (props) => {
    const [movie, setMovie] = useState(initialState);

    const handleChanges = (e) => {
        setMovie({ ...movie, [e.target.name]: e.target.value });
    };

const handleSubmit = e => {
        axios.post("http://localhost:5000/api/movies", this.state.movies)
        .then(res => {
            console.log(res.data)
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
        <button type="submit">Submit</button>
      </form>
        </div>
    )
}

export default MovieForm;