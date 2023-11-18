import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Oval } from "react-loader-spinner";

const ShowDescription = () => {
  let { id } = useParams();
  const [showData, setShowData] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=ffd70a54fca87d6fc97cfa6bd11dee02`
    )
      .then((response) => response.json())
      .then((data) => {
        setLoading(true);
        setShowData(data);
      });
  }, [id]);
  return (
    <div className="title-overview">
      {Object.keys(showData).length === 0 ? (
        <div className="vm-loader">
          <Oval
            visible="true"
            loading={loading}
            ariaLabel="loading"
            color="white"
            secondaryColor="#4c4e52"
            strokeWidth="4"
          />{" "}
        </div>
      ) : (
        <div className="title-info">
          {showData.poster_path === null ? (
            <img
              src={
                "https://images.unsplash.com/photo-1592854899481-f78db4baccb6?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
      )}
    </div>
  );
};

export default ShowDescription;
