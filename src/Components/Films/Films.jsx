import { useState } from "react";
import { Link } from "react-router-dom";
import PaginationFilms from "../Pagination/PaginationForFilms";
import { Oval } from "react-loader-spinner";
import "./Films.scss";

const Films = () => {
  const [query, setQuerry] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(false);

  const handleInput = (event) => {
    setQuerry(event.target.value);
  };

  const handleKey = (event) => {
    if (event.key === "Enter") {
      setLoading(true);
      searchFilms();

      if (query.length > 0) {
        setSearchTerm(true);
      }
    }
  };

  const searchFilms = () => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=ffd70a54fca87d6fc97cfa6bd11dee02`
    )
      .then((response) => response.json())
      .then((data) => {
        setResults(data.results);
        setLoading(false);
      });
  };
  return (
    <div className="items-search">
      <h2>Browse Films</h2>

      <div className="search">
        <input
          type="text"
          onChange={handleInput}
          onKeyDownCapture={handleKey}
          value={query}
          autoFocus
        />
        <button onClick={searchFilms}>Search</button>
        <Link to={"/"}>
          <h3>Home</h3>
        </Link>
      </div>
      {searchTerm && results.length === 0 && !loading && (
        <h4>Film not found!</h4>
      )}
      {loading && results.length === 0 ? (
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
        <PaginationFilms data={results} />
      )}
    </div>
  );
};

export default Films;
