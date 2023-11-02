import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./Genres.scss";

const GenreSearch = () => {
  const [filmGenres, setFilmGenres] = useState([]);
  const [showGenres, setShowGenres] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=ffd70a54fca87d6fc97cfa6bd11dee02`
    )
      .then((response) => response.json())
      .then((data) => {
        setFilmGenres(data.genres);
      });
  }, []);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/genre/tv/list?language=en&api_key=ffd70a54fca87d6fc97cfa6bd11dee02"
    )
      .then((response) => response.json())
      .then((data) => {
        setShowGenres(data.genres);
      });
  }, []);

  return (
    <div className="all-genres">
      <h1>Search Genres</h1>

      <h2>Film Genres</h2>
      <div className="item-links">
        {filmGenres.map((filmGenre) => {
          return (
            <div key={filmGenre.id} className="item-desc">
              <Link to={`/film_genre_suggestions/${filmGenre.id}`}>
                {filmGenre.name}
              </Link>
            </div>
          );
        })}
      </div>

      <h2>TV Show Genres</h2>
      <div className="item-links">
        {showGenres.map((showGenre) => {
          return (
            <div key={showGenre.id} className="item-desc">
              <Link to={`/show_genre_suggestions/${showGenre.id}`}>
                {showGenre.name}
              </Link>
            </div>
          );
        })}
      </div>

      <div className="nav-links">
        <Link to={"/"}>Home</Link>
      </div>
    </div>
  );
};

export default GenreSearch;
