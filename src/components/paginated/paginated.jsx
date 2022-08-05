import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, setPageNumber, setCurrentLimit } from '../../redux/actions/index'
import leftArrows from '../../assets/icons/leftArrows.svg';
import rightArrows from '../../assets/icons/rightArrows.svg';
import firstPage from '../../assets/icons/firstPage.svg';
import lastPage from '../../assets/icons/lastPage.svg';
import './styles/paginated.css'


export default function Paginated() {

  const dispatch = useDispatch();

  const defaultLinesXPage = useSelector((state) => state.currentLimit);

  const dataToShow = useSelector((state) => state.dataToShow);
  const currentPage = useSelector((state) => state.currentPage)

  const [linesXPage, setlinesXPage] = useState(defaultLinesXPage);

  const totalPages = Math.ceil(dataToShow.length / linesXPage);

  const limit = currentPage * linesXPage;
  const offset = limit - linesXPage;

  useEffect(() => {
    const payload = {
      currentPage: currentPage,
      offset: offset,
      limit: limit
    }
    dispatch(setCurrentPage(payload))
  },[dispatch, offset, limit, currentPage])

  const defaultButtonsPerPage = 5;
  const halfPages = Math.ceil(defaultButtonsPerPage / 2);
  const maxButtons = (() => {
    if (totalPages <= defaultButtonsPerPage) {
      return totalPages;
    } else if (
      currentPage + halfPages <= totalPages &&
      currentPage >= halfPages
    ) {
      return currentPage + halfPages;
    } else if (currentPage < halfPages) {
      return defaultButtonsPerPage;
    } else {
      return totalPages;
    }
  })();

  const initButton = (() => {
    if (totalPages <= defaultButtonsPerPage) {
      return 1;
    } else if (
      currentPage + halfPages <= totalPages &&
      currentPage >= halfPages
    ) {
      return currentPage - halfPages + 1;
    } else if (currentPage < halfPages) {
      return 1;
    } else {
      return totalPages - defaultButtonsPerPage + 1;
    }
  })();
  
  const pages = [];
  for (let i = initButton; i <= maxButtons; i++) {
    pages.push(i);
  }

  const pagination = (pageNumber) => {
    const payload = {
      currentPage: pageNumber,
      offset: 0,
      limit: linesXPage
    }
    dispatch(setCurrentPage(payload));
  };

  const nextPage = () => {
    if(currentPage === totalPages) return
    if (currentPage < dataToShow.length) {
      dispatch(setPageNumber(currentPage + 1));
    }
  };
  const prevPage = () => {
    if(currentPage === 1) return
    if (currentPage !== 1) {
      dispatch(setPageNumber(currentPage - 1));
    }
  };

  const handlelastPage = () => {
    if(currentPage === totalPages) return
    dispatch(setPageNumber(totalPages));
  };

  const handleFirstPage = () => {
    if(currentPage === 1) return
    dispatch(setPageNumber(1));
  };


  function handlePageSelect(e) {
    e.preventDefault();
    dispatch(setPageNumber(1))
    dispatch(setCurrentLimit(e.target.value))
    setlinesXPage(e.target.value);
  }

  return (
    <div className="general_container">
      <section className="label_pagOf_container">
        <div className="label_current_page">
          Pag: <div className="current_page_input">{currentPage}</div>
        </div>
        <div className="label_current_page">
          Of: <div className="current_page_input">{totalPages}</div>
        </div>
      </section>
      <ul className="paginated_container">
      <li className="btn_paginated btn_pn_container" onClick={() => handleFirstPage()}>
          <button className="btn_primary btn_prev_next"><img src={firstPage} alt='last Page'/></button>
          </li>
        <li className="btn_paginated btn_pn_container" onClick={() => prevPage()}>
          <button className="btn_primary btn_prev_next"><img src={leftArrows} alt='previous' /></button>
        </li>
        {pages ? (
          pages.map((page) => (
            <li className="btn_paginated btn_main_paginated" key={page}>
              <button
                className={
                  currentPage === page ? "btn_primary_active btn_number" : "btn_primary btn_number"
                }
                onClick={() => pagination(page)}
                value={page}
              >
                {page}
              </button>
            </li>
          ))
        ) : (
          <li></li>
        )}
        <li className="btn_paginated btn_pn_container" onClick={() => nextPage()}>
          <button className="btn_primary btn_prev_next"><img src={rightArrows} alt='next'/></button>
        </li>
        <li className="btn_paginated btn_pn_container" onClick={() => handlelastPage()}>
          <button className="btn_primary btn_prev_next"><img src={lastPage} alt='last Page'/></button>
          </li>
      </ul>
      <section className="toShow_selector">
        <label className="select_page_label">
          Pages to show:{" "}
          <select
            className="select_page"
            value={linesXPage}
            onChange={(e) => handlePageSelect(e)}
          >
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
        </label>
      </section>
    </div>
  );
}
