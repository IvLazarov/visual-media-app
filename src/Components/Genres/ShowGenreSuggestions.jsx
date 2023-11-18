import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Oval } from "react-loader-spinner";

const ShowGenreSuggestions = () => {
  let genreId = useParams().id;
  const [genres, setGenres] = useState([]);
  const [showsByGenre, setShowsByGenre] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/tv?with_genres=${genreId}&api_key=ffd70a54fca87d6fc97cfa6bd11dee02`
    )
      .then((response) => response.json())
      .then((data) => {
        setLoading(true);
        setShowsByGenre(data.results);
      });
  }, [genreId]);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/genre/tv/list?language=en&api_key=ffd70a54fca87d6fc97cfa6bd11dee02"
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
            <h2>{filteredGenre.name} TV Shows</h2>
          </div>
        );
      })}
      <div className="navigation-links">
        <Link to={"/genres"}>Back to search</Link>
        <br />
        <Link to={"/"}>Home</Link>
      </div>

      <div className="films-container">
        {showsByGenre.length === 0 ? (
          <div className="loader">
            <Oval
              visible="true"
              loading={loading}
              ariaLabel="loading"
              color="white"
              secondaryColor="#4c4e52"
              strokeWidth="4"
            />
          </div>
        ) : (
          showsByGenre.map((showByGenre) => {
            return (
              <div key={showByGenre.id} className="film">
                <Link to={`/tv_show_description/${showByGenre.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w300/${showByGenre.poster_path}`}
                    alt={showByGenre.title}
                  />
                  <h3>{showByGenre.name}</h3>
                </Link>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ShowGenreSuggestions;
