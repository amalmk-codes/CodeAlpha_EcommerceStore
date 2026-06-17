import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import API from "../services/api";

function Checkout() {
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const { cart, clearCart } =
    useContext(CartContext);

  if (!token) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Please Login First</h2>
      </div>
    );
  }

  const totalAmount = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  const placeOrder = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    try {
      const userId =
        localStorage.getItem("userId");

      const userName =
        localStorage.getItem("userName");

      await API.post("/orders", {
        userId,
        userName,
        items: cart,
        totalAmount,
      });

      clearCart();

      alert("Order Placed Successfully!");

      navigate("/orders");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Order Failed"
      );
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Checkout</h1>

      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow:
            "0 2px 8px rgba(0,0,0,0.1)",
          maxWidth: "600px",
        }}
      >
        <h2>Order Summary</h2>

        {cart.map((item) => (
          <div
            key={item._id}
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              marginBottom: "10px",
            }}
          >
            <span>
              {item.name} ×{" "}
              {item.quantity}
            </span>

            <span>
              ₹
              {item.price *
                item.quantity}
            </span>
          </div>
        ))}

        <hr />

        <h2>Total: ₹{totalAmount}</h2>

        <button
          onClick={placeOrder}
          style={{
            padding: "12px 20px",
            cursor: "pointer",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#2563eb",
            color: "white",
            fontWeight: "bold",
            marginTop: "15px",
            width: "100%",
          }}
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

export default Checkout;