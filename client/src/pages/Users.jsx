import { useEffect, useState } from "react";
import API from "../services/api";

function Users() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("userRole");

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token && role === "admin") {
      fetchUsers();
    }
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/user/all");

      setUsers(res.data.users || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
        <p>Only administrators can access this page.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Loading Users...</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>👥 All Users</h1>

      <h3>Total Users: {users.length}</h3>

      {users.length === 0 ? (
        <p>No Users Found</p>
      ) : (
        users.map((user) => (
          <div
            key={user._id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "10px",
              backgroundColor: "#fff",
            }}
          >
            <h3>{user.name}</h3>

            <p>
              <strong>Email:</strong> {user.email}
            </p>

            <p>
              <strong>Role:</strong> {user.role}
            </p>

            <p>
              <strong>ID:</strong> {user._id}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default Users;