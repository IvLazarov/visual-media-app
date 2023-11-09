import { useState } from "react";
import { Link } from "react-router-dom";
import "../Films/Films.scss";
import "./People.scss";

const PeopleSearch = () => {
  const [query, setQuery] = useState("");
  const [people, setPeople] = useState([]);

  const handleInput = (event) => {
    setQuery(event.target.value);
  };

  const handleKey = (event) => {
    if (event.key === "Enter") {
      searchPeople();
    }
  };

  const searchPeople = () => {
    fetch(
      `https://api.themoviedb.org/3/search/person?query=${query}&api_key=ffd70a54fca87d6fc97cfa6bd11dee02`
    )
      .then((response) => response.json())
      .then((data) => {
        setPeople(data.results);
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
        />
        <button onClick={searchPeople}>Search</button>
      </div>

      <Link to={"/"}>
        <h3>Home</h3>
        </Link>
      <div className="people-container">
        {people.map((person) => {
          return (
            <div key={person.id} className="person">
              <Link to={`/people/person/${person.id}`}>
                {person.profile_path === null ? (
                  <img
                    src="data:image/jpeg;base64,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"
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
        })}
      </div>
    </div>
  );
};

export default PeopleSearch;
