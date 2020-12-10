import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const { push } = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const handleDelete = e => {
    e.preventDefault();
    axios.delete(`http://localhost:5000/api/movies/${movie.id}`)
    .then(res => {
        console.log("I am going to delete it...")
        setMovie(res.data)
    })
    .catch(err => console.error(err))
  };

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <button className="md-button" onClick={() => push(`/update-movie/${movie.id}`)}>
        Edit
      </button>
      <button className="md-button" onClick={handleDelete}>
        Delete
      </button>
      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
    </div>
  );
}

export default Movie;
