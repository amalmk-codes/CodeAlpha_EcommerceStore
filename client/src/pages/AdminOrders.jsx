import { useEffect, useState } from "react";
import API from "../services/api";

function AdminOrders() {
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
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders");

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
        { status }
      );

      alert("Status Updated");

      fetchOrders();
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed To Update Status"
      );
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
        order.userName
          ?.toLowerCase()
          .includes(searchText) ||
        order.userId
          ?.toLowerCase()
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

      {/* Search & Filter */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          flexWrap: "wrap",
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
        Showing {filteredOrders.length}
        {" "}Orders
      </h3>

      {filteredOrders.length === 0 ? (
        <p>No Orders Found</p>
      ) : (
        filteredOrders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              marginBottom: "15px",
              backgroundColor: "#fff",
              boxShadow:
                "0 2px 5px rgba(0,0,0,0.08)",
            }}
          >
            <h3>
              Order ID:
            </h3>

            <p>{order._id}</p>

            <hr />

            <p>
              <strong>
                User Name:
              </strong>{" "}
              {order.userName ||
                "Not Available"}
            </p>

            <p>
              <strong>
                User ID:
              </strong>{" "}
              {order.userId}
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
              {order.status}
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

            {order.items?.map(
              (item, index) => (
                <div
                  key={index}
                  style={{
                    padding: "8px",
                    border:
                      "1px solid #eee",
                    borderRadius:
                      "6px",
                    marginBottom:
                      "5px",
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

            <div
              style={{
                marginTop: "15px",
              }}
            >
              <select
                value={order.status}
                onChange={(e) =>
                  updateStatus(
                    order._id,
                    e.target.value
                  )
                }
                style={{
                  padding: "10px",
                  borderRadius: "8px",
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
          </div>
        ))
      )}
    </div>
  );
}

export default AdminOrders;