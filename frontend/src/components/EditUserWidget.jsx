import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/userContext';

export default function EditUserWidget() {
  const { user, setUser } = useAuth();
  const [city, setCity] = useState(user?.seller_city);
  const [state, setState] = useState(user?.seller_state);

  async function updateSellerAction(ev) {
    ev.preventDefault();
    try {
      const response = await axios.put('/account', {
        seller_city: city,
        seller_state: state
      });
      setUser({
        seller_city: response.data.seller_city,
        seller_state: response.data.seller_state,
        ...user
      });
      toast.success('Account updated');
    } catch (err) {
      toast.error(err.message);
      return [];
    }
  }

  return (
    <form className="max-w-lg mx-auto" onSubmit={updateSellerAction}>
      <div className="bg-white shadow p-4 rounded-2xl">
        <div className="border rounded-2xl mt-4">
          <div className="flex">
            <div className="py-3 px-4" style={{ width: 50 + '%' }}>
              <label>City</label>
              <input
                type="text"
                className="focus:ring-1 focus:ring-orange-500
			disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
			invalid:border-pink-500 invalid:text-pink-600
			focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                value={city}
                onChange={(ev) => setCity(ev.target.value)}
              />
            </div>
            <div className="py-3 px-4 border-l" style={{ width: 50 + '%' }}>
              <label>State</label>
              <input
                type="text"
                className="focus:ring-1 focus:ring-orange-500
			disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
			invalid:border-pink-500 invalid:text-pink-600
			focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                value={state}
                onChange={(ev) => setState(ev.target.value)}
              />
            </div>
          </div>
        </div>
        <button className="primary mt-4">Update Account</button>
      </div>
    </form>
  );
}
