// Pagination.js
import React from "react";
import styles from "../styles/Pagination.module.css";

const Pagination = ({ perPage, total, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(total / perPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={styles.scifiPagination}>
      <ul className={`pagination ${styles.pagination}`}>
        {pageNumbers.map((number) => (
          <li key={number} className={`page-item ${styles.pageItem}`}>
            <a
              onClick={() => paginate(number)}
              href={`#post/${number}`}
              className={`page-link ${
                currentPage === number
                  ? styles.activeLink
                  : styles.scifiPageLink
              }`}
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
