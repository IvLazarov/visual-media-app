import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CastCredits from "./CastCredits";
import CrewCredits from "./CrewCredits";
import "./Person.scss";

const Person = () => {
  let { id } = useParams();
  const [personData, setPersonData] = useState([]);
  const [personCastCredits, setPersonCastCredits] = useState([]);
  const [personCrewCredits, setPersonCrewCredits] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/person/${id}?api_key=ffd70a54fca87d6fc97cfa6bd11dee02`
    )
      .then((response) => response.json())
      .then((data) => {
        setPersonData(data);
      });
  }, [id]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=ffd70a54fca87d6fc97cfa6bd11dee02`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPersonCastCredits(data.cast);
        setPersonCrewCredits(data.crew);
      });
  }, [id]);
  return (
    <div className="person-description">
      <h1>{personData.name}</h1>

      <h2>As Cast Member</h2>
      <CastCredits personCastCredits={personCastCredits} />

      <h2>As Crew Member</h2>
      <CrewCredits personCrewCredits={personCrewCredits} />

      <div className="nav-links">
        <Link to={"/"}>Home</Link>
        <Link to={"/people"}>Back to search</Link>
      </div>
    </div>
  );
};

export default Person;
