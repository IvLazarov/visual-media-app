import "./App.css";
import { Routes, Route } from "react-router";
import Home from "./Components/Home/Home";
import Films from "./Components/Films/Films";
import TVShows from "./Components/TV Shows/TVShows";
import ShowDescription from "./Components/TV Shows/ShowDescription";
import PeopleSearch from "./Components/People/People";
import Person from "./Components/People/Person";
import GenreSearch from "./Components/Genres/GenreSearch";
import FilmGenreSuggestions from "./Components/Genres/FilmGenreSuggestions";
import FilmDescription from "./Components/Films/FilmDescription";
import ShowGenreSuggestions from "./Components/Genres/ShowGenreSuggestions";
import ErrorPage from "./Components/Error/ErrorPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/films" element={<Films />} />
        <Route path="/film_description/:id" element={<FilmDescription />} />
        <Route path="/tv_shows" element={<TVShows />} />
        <Route path="/tv_show_description/:id" element={<ShowDescription />} />
        <Route path="/people" element={<PeopleSearch />} />
        <Route path="/people/person/:id" element={<Person />} />
        <Route path="/genres" element={<GenreSearch />} />
        <Route
          path="/film_genre_suggestions/:id"
          element={<FilmGenreSuggestions />}
        />
        <Route
          path="/show_genre_suggestions/:id"
          element={<ShowGenreSuggestions />}
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
