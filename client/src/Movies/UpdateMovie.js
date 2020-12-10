import React, { useEffect, useState } from "react";
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialState = {
    title: '',
    director: '',
    metascore: '',
    stars: []
}

const UpdateMovie = props => {
    const [movie, setMovie] = useState(initialState);
    const { push } = useHistory();
    const { id } = useParams();

    const handleChanges = (e) => {
        setMovie({ ...movie, [e.target.name]: e.target.value });
    };
console.log(props)

useEffect(() => {
    axios.get(`http://localhost:5000/api/movies/${id}`)
    .then(res => setMovie(res.data))
    .catch(err => console.error(err))
},[id])

    const handleSubmit = e => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${id}`, movie)
        .then(res => {
            setMovie(res.data)
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

export default UpdateMovie;