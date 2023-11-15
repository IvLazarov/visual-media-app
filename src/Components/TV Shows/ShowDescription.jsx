import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const ShowDescription = () => {
  let { id } = useParams();
  const [showData, setShowData] = useState({});
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=ffd70a54fca87d6fc97cfa6bd11dee02`
    )
      .then((response) => response.json())
      .then((data) => {
        setShowData(data);
      });
  }, [id]);
  return (
    <div className="title-overview">
      <div className="title-info">
        {showData.poster_path === null ? (
          <img
            src={
              "https://static1.srcdn.com/wordpress/wp-content/uploads/2023/08/best-tv-shows-of-all-time.jpg"
            }
            alt={showData.original_title}
          />
        ) : (
          <img
            src={`https://image.tmdb.org/t/p/w300/${showData.poster_path}`}
            alt={showData.original_title}
          />
        )}
        <div className="title-data">
          <h1>{showData.name}</h1>
          <div>
            {showData.tagline === ""
              ? "No tagline available"
              : showData.tagline}
          </div>
          <h3>
            {showData.overview === ""
              ? "No description available"
              : showData.overview}
          </h3>
          <p>Number of episodes: {showData.number_of_episodes}</p>
          <p>Number of seasons: {showData.number_of_seasons}</p>

        <div className="nav-links">
        <Link to={"/tv_shows"}>Back to search</Link>
        <Link to={"/"}>Home</Link>
      </div>
        </div>
      </div>

      
    </div>
  );
};

export default ShowDescription;
