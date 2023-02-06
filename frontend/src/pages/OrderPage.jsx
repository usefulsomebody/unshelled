import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

import Loader from '../components/Loader';
import NotFound from '../components/NotFound';

export default function OrderPage() {
  const dataFetchedRef = useRef(false);
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    if (id) {
      axios.get('/order_items/' + id).then((response) => {
        setOrder(response.data);
        setLoading(false);
      });
    }
  }, [id]);

  const [price, setPrice] = useState(order?.price);
  const [freightValue, setFreightValue] = useState(order?.freight_value);

  if (loading) {
    return <Loader />;
  }
  if (!order) {
    return <NotFound />;
  }

  async function updateOrderAction(ev) {
    ev.preventDefault();
    try {
      const response = await axios.put('/order_items/' + id, {
        price,
        freight_value: freightValue
      });
      const updateOrder = {
        price: response.data.price,
        freight_value: response.data.freight_value,
        order_id: order.order_id,
        shipping_limit_date: order.shipping_limit_date,
        seller_id: order.seller_id
      };
      setOrder(updateOrder);

      toast.success('Order updated');
    } catch (err) {
      toast.error(err.message);
      return [];
    }
  }

  return (
    <div className="my-8">
      <h1 className="text-3xl">#{order?.order_id}</h1>
      <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
        <div className="bg-primary p-6 text-white rounded-2xl">
          <div>Total price</div>
          <div className="text-3xl">${order?.price}</div>
        </div>
        {/* Product Item list here */}
      </div>
      <form onSubmit={updateOrderAction}>
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1">Price</h3>
            <input
              type="number"
              value={price}
              onChange={(ev) => setPrice(ev.target.value)}
              placeholder="100.00"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Freight Value</h3>
            <input
              type="text"
              value={freightValue}
              onChange={(ev) => setFreightValue(ev.target.value)}
              placeholder="111.20"
            />
          </div>
        </div>
        <button className="primary my-4">Save</button>
      </form>
    </div>
  );
}
