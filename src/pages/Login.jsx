import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");

    } catch (err) {
      alert(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ fontFamily: "Arial", background: "#f2f2f2", minHeight: "100vh" }}>

      {/* HEADER */}
      <div style={{
        background: "linear-gradient(to right, #1e4d7b, #3b79b7)",
        color: "white",
        padding: 20
      }}>
        <h1 style={{ margin: 0 }}>SASH Learning Hub</h1>
        <small>Smart Learning | Digital Growth Platform</small>
      </div>

      {/* MAIN CONTAINER */}
      <div style={{
        width: "80%",
        margin: "40px auto",
        display: "flex",
        gap: 20
      }}>

        {/* LOGIN BOX */}
        <div style={{
          background: "#dfe6ed",
          padding: 25,
          flex: 1,
          border: "1px solid #aaa",
          borderRadius: 8
        }}>

          <h2 style={{ textAlign: "center" }}>Application Portal</h2>

          <form onSubmit={login}>

            <div style={{ marginBottom: 15 }}>
              <label>Username / Email</label>
              <input
                type="text"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "100%", padding: 8 }}
              />
            </div>

            <div style={{ marginBottom: 15 }}>
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: "100%", padding: 8 }}
              />
            </div>

            <button
              type="submit"
              style={{
                padding: "8px 15px",
                background: "#1e4d7b",
                color: "white",
                border: "none",
                cursor: "pointer",
                width: "100%"
              }}
            >
              Login
            </button>

          </form>

          <p style={{ marginTop: 10 }}>
            Forgot username or password?
          </p>

        </div>

        {/* INFO BOX */}
        <div style={{
          background: "#dfe6ed",
          padding: 25,
          flex: 1,
          border: "1px solid #aaa",
          borderRadius: 8
        }}>

          <h2 style={{ textAlign: "center" }}>
            Is this your first time here?
          </h2>

          <p>
            <b>Applicants' Login Page</b>
          </p>

          <p>
            Log in with your Username and Password to continue.
            Use the same details you created during registration.
          </p>

          <p>
            Having trouble logging in?{" "}
            <a href="#">Reset your password</a>
          </p>

          <button
            onClick={() => navigate("/signup")}
            style={{
              marginTop: 20,
              padding: 10,
              background: "#2c7a2c",
              color: "white",
              border: "none",
              cursor: "pointer",
              width: "100%"
            }}
          >
            Create New Account
          </button>

        </div>

      </div>

      {/* FOOTER */}
      <div style={{
        background: "#1e4d7b",
        color: "white",
        textAlign: "center",
        padding: 15,
        marginTop: 40
      }}>
        © 2026 SASH Learning Hub | All Rights Reserved
      </div>

    </div>
  );
}