import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import ProductDetails from "./pages/ProductDetails";

import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import ManageOrders from "./pages/ManageOrders";
import Users from "./pages/Users";
import Analytics from "./pages/Analytics";

function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#f5f7fb",
        }}
      >
        <Navbar />

        <Routes>
          {/* Home */}
          <Route
            path="/"
            element={<Home />}
          />

          {/* Authentication */}
          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          {/* User Pages */}
          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/cart"
            element={<Cart />}
          />

          <Route
            path="/checkout"
            element={<Checkout />}
          />

          <Route
            path="/orders"
            element={<Orders />}
          />

          {/* Product Details */}
          <Route
            path="/products/:id"
            element={<ProductDetails />}
          />

          {/* Admin */}
          <Route
            path="/admin-login"
            element={<AdminLogin />}
          />

          <Route
            path="/admin"
            element={<Admin />}
          />

          <Route
            path="/admin/orders"
            element={<ManageOrders />}
          />

          <Route
            path="/users"
            element={<Users />}
          />

          <Route
            path="/analytics"
            element={<Analytics />}
          />

          {/* 404 */}
          <Route
            path="*"
            element={
              <div
                style={{
                  padding: "30px",
                  textAlign: "center",
                }}
              >
                <h2>
                  404 - Page Not Found
                </h2>
              </div>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;