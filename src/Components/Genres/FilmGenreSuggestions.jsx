/* eslint-disable react/prop-types */
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Genres.scss";

const FilmGenreSuggestions = () => {
  let genreId = useParams().id;
  const [genres, setGenres] = useState([]);
  const [moviesByGenre, setMoviesByGenre] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&api_key=ffd70a54fca87d6fc97cfa6bd11dee02`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.results);
        setMoviesByGenre(data.results);
      });
  }, [genreId]);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=ffd70a54fca87d6fc97cfa6bd11dee02"
    )
      .then((response) => response.json())
      .then((data) => {
        setGenres(data.genres);
      });
  }, []);

  let filterGenres = genres.filter((genre) => {
    return genre.id === parseInt(genreId);
  });

  return (
    <div className="film-suggestions">
      {filterGenres.map((filteredGenre) => {
        return (
          <div key={filteredGenre.id}>
            <h2>{filteredGenre.name} Films</h2>
          </div>
        );
      })}

      <div className="films-container">
        {moviesByGenre.map((movieByGenre) => {
          return (
            <div key={movieByGenre.id} className="film">
              <Link to={`/film_description/${movieByGenre.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w300/${movieByGenre.poster_path}`}
                  alt={movieByGenre.title}
                />
                <h3>{movieByGenre.title}</h3>
              </Link>
            </div>
          );
        })}
      </div>

      <div className="nav-links">
        <Link to={"/genres"}>Back to search</Link>
        <br />
        <Link to={"/"}>Home</Link>
      </div>
    </div>
  );
};

export default FilmGenreSuggestions;
