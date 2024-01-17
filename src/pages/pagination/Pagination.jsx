import React from "react";
import styles from "./pagination.module.css";

const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className={styles.pagination}>
      {pages.map((page, index) => {
        return (
          <button
            key={index}
            onClick={() => setCurrentPage(page)}
            className={`${page == currentPage ? styles.active : ""}`}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
