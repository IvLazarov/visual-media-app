/* eslint-disable react/prop-types */

import PaginationPeople from "../Pagination/PaginationForPeople";

const CrewCredits = ({ personCrewCredits }) => {
  return (
    <div className="pagination-align">
      <PaginationPeople data={personCrewCredits} />
    </div>
  );
};

export default CrewCredits;
