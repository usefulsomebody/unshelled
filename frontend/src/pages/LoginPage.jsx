import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/userContext.jsx";

export default function LoginPage() {
  const navigate = useNavigate();
  const [sellerId, setSellerId] = useState("");
  const [isError, setIsError] = useState(false);
  const [password, setPassword] = useState("");
  const { error, dispatch, setUser } = useAuth();
  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    dispatch({ type: "loginStart" });
    try {
      const { data } = await axios.post("/login", {
        seller_id: sellerId,
        password,
      });
      setUser(data);
      toast.success("Login successful");
      navigate("/");
      dispatch({ type: "loginSuccess", payload: res.data.details });
    } catch (err) {
      setIsError(true);
      dispatch({ type: "actionFailure", payload: err.response?.data });
      return [];
    }
  }

  const formDisabled = sellerId === "" || password === "";

  useEffect(() => {
    // show error message if there is any
    if (isError) {
      toast.error(error?.message);
    }
  }, [error]);

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input
            type="text"
            className="focus:ring-1 focus:ring-orange-500
		  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
		  invalid:border-pink-500 invalid:text-pink-600
		  focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
            placeholder="Seller Id"
            value={sellerId}
            onChange={(ev) => setSellerId(ev.target.value)}
          />
          <input
            type="password"
            className="focus:ring-1 focus:ring-orange-500
		  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
		  invalid:border-pink-500 invalid:text-pink-600
		  focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button
            className="primary bg-orange-500 hover:bg-orange-600 mt-4"
            disabled={formDisabled}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
