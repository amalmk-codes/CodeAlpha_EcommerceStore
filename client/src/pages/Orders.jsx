import { useEffect, useState } from "react";
import API from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);

  const userId =
    localStorage.getItem("userId");

  const token =
    localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await API.get(
        `/orders/user/${userId}`
      );

      setOrders(res.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  const cancelOrder = async (
    orderId
  ) => {
    try {
      await API.put(
        `/orders/${orderId}/cancel`
      );

      alert(
        "Order Cancelled Successfully"
      );

      fetchOrders();
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed To Cancel Order"
      );
    }
  };

  if (!token) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Please Login First</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <p>No Orders Found</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
              marginBottom: "15px",
              backgroundColor: "#fff",
              boxShadow:
                "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <p>
              <strong>
                Order ID:
              </strong>{" "}
              {order._id}
            </p>

            <p>
              <strong>
                User Name:
              </strong>{" "}
              {order.userName}
            </p>

            <p>
              <strong>
                Total Amount:
              </strong>{" "}
              ₹{order.totalAmount}
            </p>

            <p>
              <strong>
                Status:
              </strong>{" "}
              <span
                style={{
                  color:
                    order.status ===
                    "Delivered"
                      ? "green"
                      : order.status ===
                        "Cancelled"
                      ? "red"
                      : order.status ===
                        "Shipped"
                      ? "blue"
                      : "orange",
                  fontWeight: "bold",
                }}
              >
                {order.status}
              </span>
            </p>

            <p>
              <strong>
                Order Date:
              </strong>{" "}
              {new Date(
                order.createdAt
              ).toLocaleString()}
            </p>

            <h4>
              Ordered Products
            </h4>

            {order.items.map(
              (item, index) => (
                <div
                  key={index}
                  style={{
                    marginBottom:
                      "10px",
                    padding: "10px",
                    background:
                      "#f8fafc",
                    borderRadius:
                      "8px",
                  }}
                >
                  <p>
                    <strong>
                      Product:
                    </strong>{" "}
                    {item.name}
                  </p>

                  <p>
                    <strong>
                      Price:
                    </strong>{" "}
                    ₹{item.price}
                  </p>

                  <p>
                    <strong>
                      Quantity:
                    </strong>{" "}
                    {item.quantity}
                  </p>
                </div>
              )
            )}

            {(order.status ===
              "Pending" ||
              order.status ===
                "Processing") && (
              <button
                onClick={() =>
                  cancelOrder(
                    order._id
                  )
                }
                style={{
                  marginTop:
                    "10px",
                  padding:
                    "10px 15px",
                  border: "none",
                  borderRadius:
                    "8px",
                  backgroundColor:
                    "#ef4444",
                  color: "white",
                  cursor: "pointer",
                  fontWeight:
                    "bold",
                }}
              >
                Cancel Order
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;