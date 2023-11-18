import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Oval } from "react-loader-spinner";

import "./Genres.scss";

const GenreSearch = () => {
  const [filmGenres, setFilmGenres] = useState([]);
  const [showGenres, setShowGenres] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=ffd70a54fca87d6fc97cfa6bd11dee02`
    )
      .then((response) => response.json())
      .then((data) => {
        setLoading(true);
        setFilmGenres(data.genres);
      });
  }, []);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/genre/tv/list?language=en&api_key=ffd70a54fca87d6fc97cfa6bd11dee02"
    )
      .then((response) => response.json())
      .then((data) => {
        setLoading(true);
        setShowGenres(data.genres);
      });
  }, []);

  return (
    <div className="all-genres">
      <h1>Search Genres</h1>

      <div className="home-link">
        <Link to={"/"}>Home</Link>
      </div>

      <div className="suggestions">
        <div className="item-links">
          <h2>Film Genres</h2>

          {filmGenres.length === 0 ? (
            <div className="suggestions-loader">
              <Oval
                visible="true"
                ariaLabel="loading"
                loading={loading}
                color="white"
                secondaryColor="#4c4e52"
                strokeWidth="4"
              />
            </div>
          ) : (
            <div className="items-align">
              {filmGenres.map((filmGenre) => {
                return (
                  <div key={filmGenre.id}>
                    <Link to={`/film_genre_suggestions/${filmGenre.id}`}>
                      {filmGenre.name}
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="item-links">
          <h2>TV Show Genres</h2>
          {showGenres.length === 0 ? (
            <div className="suggestions-loader">
              <Oval
                visible="true"
                ariaLabel="loading"
                loading={loading}
                color="white"
                secondaryColor="#4c4e52"
                strokeWidth="4"
              />
            </div>
          ) : (
            <div className="items-align">
              {showGenres.map((showGenre) => {
                return (
                  <div key={showGenre.id}>
                    <Link to={`/show_genre_suggestions/${showGenre.id}`}>
                      {showGenre.name}
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenreSearch;
