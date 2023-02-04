import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import OrderListItem from "../components/OrderListItem";

import AccountNav from "../components/AccountNav";

export default function OrderDetailsPage() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(false);

  const [loading, setLoading] = useState(false);
  const fetchOrders = async () => {
    setLoading(true);
    try {
      await axios.get(`/order_items`).then((res) => {
        setOrders(res.data.orders[0].data);
        setLoading(false);
      });
    } catch (err) {
      setLoading(false);
      setError(true);
      toast.error(err.message);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`/order_items/${id}`, {
        withCredentials: true,
      });
      setOrders(orders.filter((item) => item.id !== id));
      toast.success("Order successfully deleted");
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
                "Something went wrong!"
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
                      <OrderListItem
                        order={order}
                        handleDelete={() => handleDelete(order.id)}
                      />
                    </div>
                  ))}
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
