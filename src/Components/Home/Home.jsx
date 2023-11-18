import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Oval } from "react-loader-spinner";
import "./Home.scss";

const Home = () => {
  const [trendingData, setTrendingData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/trending/all/week?language=en-US&api_key=ffd70a54fca87d6fc97cfa6bd11dee02"
    )
      .then((response) => response.json())
      .then((data) => {
        setLoading(true);
        setTrendingData(data.results);
      });
  }, []);

  return (
    <div>
      <div className="page-title">
        <h1>Browse Films & TV shows</h1>
      </div>

      <div className="page-links">
        <Link to={"/people"}>Search People in Film and TV</Link>
        <br />
        <Link to={"/films"}>Search Films</Link>
        <br />
        <Link to={"/tv_shows"}>Search TV Shows</Link>
        <br />
        <Link to={"/genres"}>Search Genres</Link>
      </div>

      <div className="trending">
        <h2>#Trending</h2>
      </div>

      <div className="trending-results">
        {trendingData.length === 0 ? (
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
          trendingData.map((trendingDatum) => {
            return (
              <div key={trendingDatum.id}>
                <Link
                  to={
                    trendingDatum.media_type === "movie"
                      ? `/film_description/${trendingDatum.id}`
                      : `/tv_show_description/${trendingDatum.id}`
                  }
                >
                  {trendingDatum.poster_path === null ? (
                    <img
                      src={
                        "https://kubadownload.com/site/assets/files/1731/movies.730x0.png"
                      }
                      alt={trendingDatum.name}
                    />
                  ) : (
                    <img
                      src={`https://image.tmdb.org/t/p/w300/${trendingDatum.poster_path}`}
                      alt={trendingDatum.name}
                    />
                  )}
                  <h3>{trendingDatum.name || trendingDatum.title}</h3>
                </Link>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Home;
