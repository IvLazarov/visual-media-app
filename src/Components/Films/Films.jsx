import { useState } from "react";
import { Link } from "react-router-dom";
import PaginationFilms from "../Pagination/PaginationForFilms";
import "./Films.scss";
import { Oval } from  'react-loader-spinner';

const Films = () => {
  const [query, setQuerry] = useState("");
  const [results, setResults] = useState([]);

  const handleInput = (event) => {
    setQuerry(event.target.value);
  };

  const handleKey = (event) => {
    if (event.key === "Enter") {
      searchFilms();
    }
  };

  const searchFilms = () => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=ffd70a54fca87d6fc97cfa6bd11dee02`
    )
      .then((response) => response.json())
      .then((data) => {
        setResults(data.results);
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
        />
        <button onClick={searchFilms}>Search</button>
      </div>

      <Link to={"/"}>
        <h3>Home</h3>
        </Link>
        {
          results.length === null ? 

        <Oval
        visible="true"
        ariaLabel="loading"
        color="white"
        secondaryColor="#4c4e52"
        /> :<PaginationFilms data={results} />

        
        }
        

      
    </div>
  );
};

export default Films;
