import './App.css'
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/Layout";
import axios from "axios";
import { UserContextProvider } from "./contexts/userContext";
import AuthRoute from "./components/AuthRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import AccountPage from "./pages/AccountPage.jsx";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import OrderPage from "./pages/OrderPage";
import NotFound from "./components/NotFound";

axios.defaults.baseURL = 'http://127.0.0.1:4000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route element={<Layout />}>
			<Route path="/login" element={<AuthRoute />}>
				<Route index element={<LoginPage />} />
			</Route>
			<Route path="/" element={<ProtectedRoute />}>
				<Route index element={<OrderDetailsPage />} />
				<Route path="/orders/:id" element={<OrderPage />} />
				<Route path="/account" element={<AccountPage />} />
			</Route>
			<Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App