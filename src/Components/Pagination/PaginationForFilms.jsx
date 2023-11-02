/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import "./Pagination.scss";

const PaginationFilms = (props) => {
  const { data } = props;
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 4;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className="item-description">
        {currentItems.map((item) => {
          return (
            <div key={item.id}>
              <Link to={`/film_description/${item.id}`}>
                {item.poster_path === null ? (
                  <img
                    src={
                      "https://fikti.umsu.ac.id/wp-content/uploads/2023/01/roll-film.jpg"
                    }
                    alt={item.title}
                  />
                ) : (
                  <img
                    src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`}
                    alt={item.title}
                  />
                )}
                <h3>{item.title}</h3>
              </Link>
            </div>
          );
        })}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeClassName="active"
      />
    </>
  );
};

export default PaginationFilms;
