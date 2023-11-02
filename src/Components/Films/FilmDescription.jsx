import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./FilmDescription.scss";

const FilmDescription = () => {
  let { id } = useParams();
  const [filmData, setFilmData] = useState({});

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=ffd70a54fca87d6fc97cfa6bd11dee02`
    )
      .then((response) => response.json())
      .then((data) => {
        setFilmData(data);
      });
  }, [id]);

  return (
    <div className="title-overview">
      <div className="title-info">
        {filmData.poster_path === null ? (
          <img
            src={
              "https://fikti.umsu.ac.id/wp-content/uploads/2023/01/roll-film.jpg"
            }
            alt={filmData.title}
          />
        ) : (
          <img
            src={`https://image.tmdb.org/t/p/w300/${filmData.poster_path}`}
            alt={filmData.title}
          />
        )}

        <div className="title-data">
          <h1>{filmData.title}</h1>
          <p>{filmData.runtime} min</p>
          <div>{filmData.tagline}</div>
          <h3>{filmData.overview}</h3>
        </div>
      </div>

      <div className="nav-links">
        <Link to={"/films"}>Back to search</Link>
        <Link to={"/"}>Home</Link>
      </div>
    </div>
  );
};

export default FilmDescription;
