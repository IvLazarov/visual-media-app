import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CastCredits from "./CastCredits";
import CrewCredits from "./CrewCredits";
import { Oval } from "react-loader-spinner";
import "./Person.scss";

const Person = () => {
  let { id } = useParams();
  const [personData, setPersonData] = useState([]);
  const [personCastCredits, setPersonCastCredits] = useState([]);
  const [personCrewCredits, setPersonCrewCredits] = useState([]);
  const [loading, setLoading] = useState(false);

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
        setLoading(true);
        setPersonCastCredits(data.cast);
        setPersonCrewCredits(data.crew);
      });
  }, [id]);
  return (
    <div className="person-description">
      <div className="nav-links-2">
        <h1>{personData.name}</h1>
        <div>
          <Link to={"/"}>Home</Link>
          <Link to={"/people"}>Back to search</Link>
        </div>
      </div>

      <h2>As Cast Member</h2>
      {personCastCredits.length === 0 ? (
        <div className="person-loader">
          <Oval
            visible="true"
            loading={loading}
            ariaLabel="loading"
            color="white"
            secondaryColor="#4c4e52"
            strokeWidth="4"
          />
        </div>
      ) : (
        <CastCredits personCastCredits={personCastCredits} />
      )}

      <h2>As Crew Member</h2>
      {loading === false && personCrewCredits.length === 0 ? (
        <div className="person-loader-2">
          <Oval
            visible="true"
            loading={loading}
            ariaLabel="loading"
            color="white"
            secondaryColor="#4c4e52"
            strokeWidth="4"
          />
        </div>
      ) : (
        <CrewCredits personCrewCredits={personCrewCredits} />
      )}
    </div>
  );
};

export default Person;
