import React from 'react';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import OrderListItem from '../components/OrderListItem';
import Pagination from '../components/Pagination';

import AccountNav from '../components/AccountNav';

export default function OrderListPage() {
  const dataFetchedRef = useRef(false);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(null);
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);
  console.log(page);

  const [loading, setLoading] = useState(false);
  const fetchOrders = async () => {
    setLoading(true);
    try {
      await axios.get(`/order_items?page=${page}&limit=${limit}&offset=${offset}`).then((res) => {
        setOrders(res.data.data);
        setTotal(res.data.total);
        setLimit(res.data.limit);
        setOffset(res.data.offset);
        setLoading(false);
      });
    } catch (err) {
      setLoading(false);
      setError(true);
      toast.error(err.message);
    }
  };
  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    fetchOrders();
  }, [page]);

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`/order_items/` + id, {
        withCredentials: true
      });
      setOrders(orders.filter((item) => item.id !== id));
      toast.success('Order successfully deleted');
      setLoading(false);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
  return (
    <div>
      <AccountNav />
      <div>
        <div className="flex-orders-wrapper flex-orders-v2">
          <div className="flex-table">
            <div className="flex-table-header">
              <span className="is-grow">Order Id</span>
              <span>Price</span>
              <span>Date Added</span>
              <span className="cell-end">Actions</span>
            </div>
            <div className="flex-orders-inner">
              {error ? (
                'Something went wrong!'
              ) : loading ? (
                <>
                  <div className="placeload-wrapper">
                    <div className="list-view-item mb-4">
                      <div className="placeload-wrap is-flex">
                        <div className="content-shape-group mx-2">
                          <div className="content-shape is-grow loads"></div>
                        </div>
                        <div className="content-shape mx-2"></div>
                        <div className="content-shape mx-2 loads h-hidden-tablet-p"></div>
                        <div className="content-shape mx-2 loads h-hidden-tablet-p"></div>
                        <div className="content-shape cell-end mx-2 loads"></div>
                      </div>
                    </div>
                    <div className="list-view-item mb-4">
                      <div className="placeload-wrap is-flex">
                        <div className="content-shape-group mx-2">
                          <div className="content-shape is-grow loads"></div>
                        </div>
                        <div className="content-shape mx-2"></div>
                        <div className="content-shape mx-2 loads h-hidden-tablet-p"></div>
                        <div className="content-shape mx-2 loads h-hidden-tablet-p"></div>
                        <div className="content-shape cell-end mx-2 loads"></div>
                      </div>
                    </div>
                    <div className="list-view-item mb-4">
                      <div className="placeload-wrap is-flex">
                        <div className="content-shape-group mx-2">
                          <div className="content-shape is-grow loads"></div>
                        </div>
                        <div className="content-shape mx-2"></div>
                        <div className="content-shape mx-2 loads h-hidden-tablet-p"></div>
                        <div className="content-shape mx-2 loads h-hidden-tablet-p"></div>
                        <div className="content-shape cell-end mx-2 loads"></div>
                      </div>
                    </div>
                  </div>
                </>
              ) : orders.length > 0 ? (
                <>
                  {orders.map((order, index) => (
                    <div key={index}>
                      <OrderListItem order={order} handleDelete={() => handleDelete(order._id)} />
                    </div>
                  ))}
                  <Pagination
                    page={page}
                    limit={limit ? limit : 0}
                    total={total ? total : 0}
                    setPage={(page) => setPage(page)}
                  />
                </>
              ) : (
                <div className="mt-4 grow flex items-center justify-around">
                  <div className="mb-64">
                    <h1 className="text-center my-4">No Order to show!</h1>
                    <p>Currently the order table is empty</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
