import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const { cart } = useContext(CartContext);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("userName");
  const role = localStorage.getItem("userRole");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");

    alert("Logged Out Successfully");

    navigate("/login");
  };

  return (
    <nav
      style={{
        backgroundColor: "#2563eb",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <h2
        style={{
          color: "white",
          margin: 0,
        }}
      >
        🛒 E-Commerce Store
      </h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Link
          to="/"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          Home
        </Link>

        <Link
          to="/cart"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          Cart ({cart.length})
        </Link>

        {token ? (
          <>
            <Link
              to="/orders"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              My Orders
            </Link>

            <Link
              to="/profile"
              style={{
                color: "white",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              {userName}
            </Link>

            <button
              onClick={handleLogout}
              style={{
                border: "none",
                padding: "8px 12px",
                borderRadius: "8px",
                cursor: "pointer",
                backgroundColor: "#ef4444",
                color: "white",
                fontWeight: "bold",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              Login
            </Link>

            <Link
              to="/register"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              Register
            </Link>
          </>
        )}

        <Link
          to="/admin-login"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          Admin Login
        </Link>

        {role === "admin" && (
          <>
            <Link
              to="/admin"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              Admin Dashboard
            </Link>

            <Link
              to="/admin/orders"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              Manage Orders
            </Link>

            <Link
              to="/users"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              Users
            </Link>

            <Link
              to="/analytics"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              Analytics
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;