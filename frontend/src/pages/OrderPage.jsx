import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import NotFound from "../components/NotFound";

export default function OrderPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [price, setPrice] = useState(order?.price);
  const [freightValue, setFreightValue] = useState(order?.freight_value);

  useEffect(() => {
    if (id) {
      axios.get("/order_item/" + id).then((response) => {
        setOrder(response.data);
      });
    }
  }, [id]);

  if (!order) {
    return <NotFound />;
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
      <form>
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1">Price</h3>
            <input
              type="text"
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
