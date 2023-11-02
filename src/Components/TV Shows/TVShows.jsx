import { useState } from "react";
import { Link } from "react-router-dom";
import PaginationShows from "../Pagination/PaginationForShows";

const TVShows = () => {
  const [query, setQuery] = useState("");
  const [tvShows, setTvShows] = useState([]);

  const handleInput = (event) => {
    setQuery(event.target.value);
  };

  const handleKey = (event) => {
    if (event.key === "Enter") {
      searchTVShows();
    }
  };

  const searchTVShows = () => {
    fetch(
      `https://api.themoviedb.org/3/search/tv?query=${query}&api_key=ffd70a54fca87d6fc97cfa6bd11dee02`
    )
      .then((response) => response.json())
      .then((data) => {
        setTvShows(data.results);
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
        />
        <button onClick={searchTVShows}>Search</button>
      </div>

      <Link to={"/"}>Home</Link>
      <PaginationShows data={tvShows} />
    </div>
  );
};

export default TVShows;
