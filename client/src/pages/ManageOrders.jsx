import { useEffect, useState } from "react";
import API from "../services/api";

function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("All");

  const role =
    localStorage.getItem("userRole");

  useEffect(() => {
    if (role === "admin") {
      fetchOrders();
    }
  }, [role]);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders");

      console.log(res.data.orders);

      setOrders(res.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (
    id,
    status
  ) => {
    try {
      await API.put(
        `/orders/${id}/status`,
        {
          status,
        }
      );

      alert("Status Updated");

      fetchOrders();
    } catch (error) {
      console.log(error);
      alert("Failed To Update Status");
    }
  };

  if (role !== "admin") {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Access Denied</h2>
        <p>
          Only administrators can access
          this page.
        </p>
      </div>
    );
  }

  const filteredOrders = orders.filter(
    (order) => {
      const searchText =
        search.toLowerCase();

      const matchesSearch =
        order.userId
          ?.toString()
          .toLowerCase()
          .includes(searchText) ||
        order.userName
          ?.toString()
          .toLowerCase()
          .includes(searchText);

      const matchesStatus =
        statusFilter === "All" ||
        order.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    }
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Manage Orders</h1>

      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Search User Name or User ID"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={{
            padding: "10px",
            width: "300px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(
              e.target.value
            )
          }
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        >
          <option value="All">
            All Orders
          </option>

          <option value="Pending">
            Pending
          </option>

          <option value="Processing">
            Processing
          </option>

          <option value="Shipped">
            Shipped
          </option>

          <option value="Delivered">
            Delivered
          </option>

          <option value="Cancelled">
            Cancelled
          </option>
        </select>
      </div>

      <h3>
        Showing {filteredOrders.length} Orders
      </h3>

      {filteredOrders.length === 0 ? (
        <p>No Orders Found</p>
      ) : (
        filteredOrders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "15px",
              backgroundColor: "#fff",
              boxShadow:
                "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <p>
              <strong>Order ID:</strong>{" "}
              {order._id}
            </p>

            <hr />

            <p>
              <strong>User Name:</strong>{" "}
              {order.userName ||
                "Not Available"}
            </p>

            <p>
              <strong>User ID:</strong>{" "}
              {order.userId}
            </p>

            <p>
              <strong>Total Amount:</strong>{" "}
              ₹{order.totalAmount}
            </p>

            <p>
              <strong>Status:</strong>{" "}
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
              <strong>Order Date:</strong>{" "}
              {new Date(
                order.createdAt
              ).toLocaleString()}
            </p>

            <select
              value={order.status}
              onChange={(e) =>
                updateStatus(
                  order._id,
                  e.target.value
                )
              }
              style={{
                padding: "8px",
                marginTop: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            >
              <option value="Pending">
                Pending
              </option>

              <option value="Processing">
                Processing
              </option>

              <option value="Shipped">
                Shipped
              </option>

              <option value="Delivered">
                Delivered
              </option>

              <option value="Cancelled">
                Cancelled
              </option>
            </select>
          </div>
        ))
      )}
    </div>
  );
}

export default ManageOrders;