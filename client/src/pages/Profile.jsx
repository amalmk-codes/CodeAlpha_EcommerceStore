import { useEffect, useState } from "react";
import API from "../services/api";

function Profile() {
  const [user, setUser] = useState({
    name: localStorage.getItem("userName"),
    userId: localStorage.getItem("userId"),
    role: localStorage.getItem("userRole"),
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const userId =
        localStorage.getItem("userId");

      const res = await API.get(
        `/users/${userId}`
      );

      setUser({
        name: res.data.user.name,
        userId: res.data.user._id,
        role: res.data.user.role,
        email: res.data.user.email,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "30px auto",
        padding: "30px",
        background: "white",
        borderRadius: "15px",
        boxShadow:
          "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <h1>👤 My Profile</h1>

      <hr />

      <p>
        <strong>Name:</strong>{" "}
        {user.name}
      </p>

      <p>
        <strong>Email:</strong>{" "}
        {user.email || "Not Available"}
      </p>

      <p>
        <strong>User ID:</strong>{" "}
        {user.userId}
      </p>

      <p>
        <strong>Role:</strong>{" "}
        {user.role}
      </p>
    </div>
  );
}

export default Profile;