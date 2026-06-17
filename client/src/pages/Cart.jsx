import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Cart() {
  const { cart, removeFromCart } =
    useContext(CartContext);

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>🛒 Shopping Cart</h1>

      {cart.length === 0 ? (
        <p>Cart is Empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item._id}
              style={{
                border: "1px solid gray",
                margin: "10px",
                padding: "10px",
              }}
            >
              <h3>{item.name}</h3>

              <p>₹{item.price}</p>

              <p>
                Quantity: {item.quantity}
              </p>

              <button
                onClick={() =>
                  removeFromCart(item._id)
                }
              >
                Remove
              </button>
            </div>
          ))}

          <h2>Total: ₹{total}</h2>

          <Link to="/checkout">
            <button
              style={{
                padding: "10px 20px",
                marginTop: "10px",
                cursor: "pointer",
              }}
            >
              Proceed To Checkout
            </button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Cart;