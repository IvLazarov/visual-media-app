/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

const PaginationPeople = (props) => {
  const { data } = props;
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

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
      <div>
        {currentItems.length === 0
          ? "No information available"
          : currentItems.map((item) => {
              return (
                <div key={item.id}>
                  <Link to={`/film_description/${item.id}`}>
                    {item.poster_path === null ? (
                      <img
                        src="https://images.unsplash.com/photo-1592854899481-f78db4baccb6?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt={item.name}
                      />
                    ) : (
                      <img
                        src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`}
                        alt={item.name}
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
        activeLinkClassName="active"
      />
    </>
  );
};

export default PaginationPeople;
