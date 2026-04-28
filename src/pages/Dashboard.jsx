import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));

    // 🔒 protect route
    if (!token) {
      navigate("/login");
      return;
    }

    setUser(storedUser);
  }, [navigate]);

  return (
    <Layout>

      {/* HEADER */}
      <div style={styles.header}>
        <h1>Welcome to SASH Learning Hub</h1>
        <p style={styles.subtitle}>
          Excellence is real — learn, grow, and succeed.
        </p>
      </div>

      {/* GRID */}
      <div style={styles.grid}>

        {/* USER CARD */}
        <div style={styles.card}>
          <h3>👤 User Profile</h3>
          <p><b>Name:</b> {user?.name}</p>
          <p><b>Email:</b> {user?.email}</p>
          <p><b>Role:</b> {user?.role || "Student"}</p>
        </div>

        {/* COURSES */}
        <div style={styles.card}>
          <h3>📚 My Courses</h3>

          {user?.courses?.length > 0 ? (
            user.courses.map((course, index) => (
              <div key={index} style={styles.courseItem}>
                📖 {course.title}
              </div>
            ))
          ) : (
            <p>No courses enrolled yet</p>
          )}
        </div>

        {/* PAYMENT */}
        <div style={styles.card}>
          <h3>💳 Payment Status</h3>

          <p>
            Status:{" "}
            <b style={{ color: user?.isPaid ? "green" : "red" }}>
              {user?.isPaid ? "Paid" : "Not Paid"}
            </b>
          </p>

          <button
            style={styles.payBtn}
            onClick={() => (window.location.href = "/payment.html")}
          >
            Upgrade / Pay Now
          </button>
        </div>

        {/* QUICK ACTIONS */}
        <div style={styles.card}>
          <h3>⚡ Quick Actions</h3>

          <button style={styles.actionBtn} onClick={() => navigate("/site")}>
            Go to Site Page
          </button>

          <button style={styles.actionBtn} onClick={() => navigate("/profile")}>
            View Profile
          </button>
        </div>

      </div>

    </Layout>
  );
}

/* ================= STYLES ================= */

const styles = {

  header: {
    marginBottom: 20
  },

  subtitle: {
    color: "#555"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: 20
  },

  card: {
    background: "white",
    padding: 20,
    border: "1px solid #ddd",
    borderRadius: 8
  },

  courseItem: {
    padding: 5,
    borderBottom: "1px solid #eee"
  },

  payBtn: {
    marginTop: 10,
    width: "100%",
    padding: 10,
    background: "#1e4d7b",
    color: "white",
    border: "none",
    cursor: "pointer"
  },

  actionBtn: {
    width: "100%",
    marginTop: 10,
    padding: 10,
    background: "#2f3e4d",
    color: "white",
    border: "none",
    cursor: "pointer"
  }
};