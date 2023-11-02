/* eslint-disable react/prop-types */
import "./Person.scss";

import PaginationPeople from "../Pagination/PaginationForPeople";

const CastCredits = ({ personCastCredits }) => {
  return (
    <div className="pagination-align">
      <PaginationPeople data={personCastCredits} />
    </div>
  );
};

export default CastCredits;
