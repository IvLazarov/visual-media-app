import { useState } from "react";
import { Link } from "react-router-dom";
import PaginationShows from "../Pagination/PaginationForShows";
import { Oval } from "react-loader-spinner";

const TVShows = () => {
  const [query, setQuery] = useState("");
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(false);

  const handleInput = (event) => {
    setQuery(event.target.value);
  };

  const handleKey = (event) => {
    if (event.key === "Enter") {
      setLoading(true);
      searchTVShows();

      if (query.length > 0) {
        setSearchTerm(true);
      }
    }
  };

  const searchTVShows = () => {
    fetch(
      `https://api.themoviedb.org/3/search/tv?query=${query}&api_key=ffd70a54fca87d6fc97cfa6bd11dee02`
    )
      .then((response) => response.json())
      .then((data) => {
        setTvShows(data.results);
        setLoading(false);
      });
  };

  return (
    <div className="items-search">
      <h2>Browse TV Shows</h2>
      <div className="search">
        <input
          type="text"
          onChange={handleInput}
          onKeyDownCapture={handleKey}
          value={query}
          autoFocus
        />
        <button onClick={searchTVShows}>Search</button>
        <Link to={"/"}>
          <h3>Home</h3>
        </Link>
      </div>
      {searchTerm && tvShows.length === 0 && !loading && (
        <h4>TV show not found!</h4>
      )}
      {loading && tvShows.length === 0 ? (
        <div className="loader-2">
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
        <PaginationShows data={tvShows} />
      )}
    </div>
  );
};

export default TVShows;
