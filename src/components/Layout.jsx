import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Layout({ children }) {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  // Auto-close sidebar on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={styles.wrapper}>

      {/* TOP NAVBAR */}
      <div style={styles.topbar}>

        {/* HAMBURGER (MOBILE) */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={styles.hamburger}
        >
          ☰
        </button>

        <div style={styles.logo}>
          SASH Learning Hub
        </div>

        {/* USER MENU */}
        <div style={styles.userBox} onClick={() => setMenuOpen(!menuOpen)}>
          {user?.name || "User"} ▾

          {menuOpen && (
            <div style={styles.dropdown}>
              <div onClick={() => navigate("/dashboard")} style={styles.dropItem}>
                Dashboard
              </div>
              <div onClick={() => navigate("/site")} style={styles.dropItem}>
                Site
              </div>
              <div onClick={() => navigate("/profile")} style={styles.dropItem}>
                Profile
              </div>
              <div onClick={logout} style={styles.dropItem}>
                Logout
              </div>
            </div>
          )}
        </div>

      </div>

      {/* BODY */}
      <div style={styles.body}>

        {/* SIDEBAR */}
        {sidebarOpen && (
          <div style={styles.sidebar}>

            <h3>Navigation</h3>

            <button onClick={() => navigate("/dashboard")} style={styles.link}>
              Dashboard
            </button>

            <button onClick={() => navigate("/site")} style={styles.link}>
              Site Page
            </button>

            <button onClick={() => navigate("/profile")} style={styles.link}>
              Profile
            </button>

            <hr />

            <h4>Courses</h4>

            {user?.courses?.length > 0 ? (
              user.courses.map((c, i) => (
                <div key={i} style={styles.course}>
                  📚 {c.title}
                </div>
              ))
            ) : (
              <p style={{ fontSize: 12, opacity: 0.7 }}>
                No courses yet
              </p>
            )}

          </div>
        )}

        {/* MAIN CONTENT */}
        <div style={styles.content}>
          {children}
        </div>

      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {

  wrapper: {
    fontFamily: "Arial",
    minHeight: "100vh"
  },

  /* TOP BAR */
  topbar: {
    background: "#1e4d7b",
    color: "white",
    padding: "10px 15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },

  logo: {
    fontWeight: "bold",
    fontSize: 18
  },

  hamburger: {
    fontSize: 22,
    background: "transparent",
    color: "white",
    border: "none",
    cursor: "pointer"
  },

  userBox: {
    position: "relative",
    cursor: "pointer"
  },

  dropdown: {
    position: "absolute",
    right: 0,
    top: 30,
    background: "white",
    color: "black",
    width: 150,
    border: "1px solid #ccc",
    zIndex: 10
  },

  dropItem: {
    padding: 10,
    cursor: "pointer"
  },

  /* BODY */
  body: {
    display: "flex"
  },

  /* SIDEBAR */
  sidebar: {
    width: 220,
    background: "#2f3e4d",
    color: "white",
    padding: 15,
    minHeight: "100vh"
  },

  link: {
    width: "100%",
    background: "transparent",
    color: "white",
    border: "none",
    textAlign: "left",
    padding: 8,
    cursor: "pointer"
  },

  course: {
    padding: 5,
    fontSize: 13
  },

  /* MAIN */
  content: {
    flex: 1,
    padding: 20
  }
};