import { useEffect, useState } from "react";
import API from "../services/api";

function Analytics() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("userRole");

  const [data, setData] = useState(null);

  useEffect(() => {
    if (token && role === "admin") {
      fetchAnalytics();
    }
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await API.get(
        "/orders/analytics"
      );

      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!token) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Please Login First</h2>
      </div>
    );
  }

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

  if (!data) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Loading Analytics...</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>📊 Sales Analytics</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "10px",
            width: "220px",
          }}
        >
          <h2>{data.totalOrders}</h2>
          <p>Total Orders</p>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "10px",
            width: "220px",
          }}
        >
          <h2>₹{data.totalRevenue}</h2>
          <p>Total Revenue</p>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "10px",
            width: "220px",
          }}
        >
          <h2>{data.pendingOrders}</h2>
          <p>Pending Orders</p>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "10px",
            width: "220px",
          }}
        >
          <h2>{data.deliveredOrders}</h2>
          <p>Delivered Orders</p>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "10px",
            width: "220px",
          }}
        >
          <h2>{data.cancelledOrders}</h2>
          <p>Cancelled Orders</p>
        </div>
      </div>
    </div>
  );
}

export default Analytics;