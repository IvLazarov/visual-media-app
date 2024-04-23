import { useState } from "react";
import { Link } from "react-router-dom";
import "../Films/Films.scss";
import { Oval } from "react-loader-spinner";
import "./People.scss";

const PeopleSearch = () => {
  const [query, setQuery] = useState("");
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(false);

  const handleInput = (event) => {
    setQuery(event.target.value);
  };

  const handleKey = (event) => {
    if (event.key === "Enter") {
      setLoading(true);
      searchPeople();

      if (query.length > 0) {
        setSearchTerm(true);
      }
    }
  };

  const searchPeople = () => {
    fetch(
      `https://api.themoviedb.org/3/search/person?query=${query}&api_key=ffd70a54fca87d6fc97cfa6bd11dee02`
    )
      .then((response) => response.json())
      .then((data) => {
        setPeople(data.results);
        setLoading(false);
      });
  };
  return (
    <div className="items-search">
      <h2>Search People in Film and TV</h2>

      <div className="search">
        <input
          type="text"
          onChange={handleInput}
          onKeyDownCapture={handleKey}
          value={query}
          autoFocus
        />
        <button onClick={searchPeople}>Search</button>
        <Link to={"/"}>
          <h3>Home</h3>
        </Link>
      </div>
      {searchTerm && people.length === 0 && !loading && (
        <h4>Person not found!</h4>
      )}
      <div className="people-container">
        {loading && people.length === 0 ? (
          <div className="loader">
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
          people.map((person) => {
            return (
              <div key={person.id} className="person">
                <Link to={`/people/person/${person.id}`}>
                  {person.profile_path === null ? (
                    <img
                      src="https://images.unsplash.com/photo-1592854899481-f78db4baccb6?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt={person.name}
                    />
                  ) : (
                    <img
                      src={`https://image.tmdb.org/t/p/w300/${person.profile_path}`}
                      alt={person.name}
                    />
                  )}
                  <h3>{person.name}</h3>
                </Link>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default PeopleSearch;
