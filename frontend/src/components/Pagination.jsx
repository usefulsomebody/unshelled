import React from 'react';
import { useState } from 'react';

const Pagination = ({ page, total, limit, setPage }) => {
  const totalPages = Math.ceil(total / limit);
  const onClick = (newPage) => {
    setPage(newPage + 1);
  };

  return (
    <nav className="flex-pagination pagination" aria-label="pagination">
      <ul className="pagination-list">
        {totalPages > 0 &&
          [...Array(totalPages)].map((val, index) => (
            <li onClick={() => onClick(index)} key={index}>
              <a
                className={page === index + 1 ? `pagination-link is-current` : `pagination-link`}
                aria-label={`Goto page ${index + 1}`}
              >
                {index + 1}
              </a>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default Pagination;
