import React from "react";
import ReactPaginate from "react-paginate";
import './style.css'

const Pagination = (props) => {
  const handlePageClick = (e) => {
    props.setPage(e.selected + 1)
  };
  const i = () => {
    if (props.onClick)
    props.onClick();
  }

  return (
    <div className="page-numbers" onClick={i} >
     
        <ReactPaginate
          breakLabel={false}
          nextLabel=">"
          onPageChange={(e) => handlePageClick(e)}
          pageRangeDisplayed={3}
          pageCount={props.dataList.totalPages}
          marginPagesDisplayed={false}
          previousLabel="<"
          renderOnZeroPageCount={null}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination justify-content-end"
          activeClassName="active"
          forcePage={props.page - 1}
        />
      
    </div>
  );
};

export default Pagination;