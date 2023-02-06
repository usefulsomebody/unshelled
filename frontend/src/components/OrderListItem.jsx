import React from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

export default function OrderListItem({ order, handleDelete }) {
  return (
    <div className="flex-table-item is-order">
      <div className="flex-table-cell is-grow">
        <div className="ml-5">
          <span className="item-name">#{order.order_id}</span>
        </div>
      </div>
      <div className="flex-table-cell">
        <span className="light-text">${order.price}</span>
      </div>
      <div className="flex-table-cell">
        {format(new Date(order.shipping_limit_date), 'yyyy-MM-dd')}
      </div>
      <div className="flex-table-cell cell-end action">
        <Link to={`/orders/${order._id}`} title="Modify">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 20h9"></path>
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
          </svg>
        </Link>
        <button data-action="delete" title="Delete" onClick={() => handleDelete(order._id)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        </button>
      </div>
    </div>
  );
}
