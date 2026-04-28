import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    surname: "",
    firstname: "",
    middlename: "",
    email: "",
    email2: "",
    username: "",
    password: "",
    password2: "",
    gender: "",
    phone: "",
    programme: "",
    source: "",
    other: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const signup = async () => {
    if (form.email !== form.email2) {
      return alert("Emails do not match");
    }

    if (form.password !== form.password2) {
      return alert("Passwords do not match");
    }

    try {
      await API.post("/auth/signup", {
        name: form.firstname + " " + form.surname,
        email: form.email,
        password: form.password,
        role: "student",
        phone: form.phone,
        gender: form.gender,
        programme: form.programme
      });

      alert("Account created successfully");
      navigate("/login");

    } catch (err) {
      alert(err?.response?.data?.message || "Signup failed");
    }
  };

  const boxStyle = {
    border: "1px solid #3b79b7",
    background: "#fff",
    padding: 15,
    marginBottom: 20
  };

  const row = {
    display: "flex",
    alignItems: "center",
    marginBottom: 10
  };

  const label = {
    width: 250
  };

  const input = {
    padding: 6,
    width: 250,
    border: "1px solid #999"
  };

  const socialBtn = {
    padding: "8px 12px",
    background: "#1e4d7b",
    color: "white",
    textDecoration: "none",
    borderRadius: 6,
    fontSize: 13
  };

  return (
    <div style={{ fontFamily: "Arial", background: "#f5f5f5" }}>

      {/* HEADER */}
      <div style={{
        background: "linear-gradient(to right, #1e4d7b, #3b79b7)",
        color: "white",
        padding: 15
      }}>
        <img src={logo} style={{ width: 50 }} />
        <h2>SASH Learning Hub</h2>
      </div>

      <div style={{ width: "85%", margin: "20px auto" }}>

        <h2>Create a New Account</h2>

        <p>
          Each candidate must choose a username and password.
        </p>

        {/* PERSONAL DATA */}
        <div style={boxStyle}>
          <h3>PERSONAL DATA</h3>

          <div style={row}>
            <label style={label}>Surname *</label>
            <input name="surname" onChange={handleChange} style={input} />
          </div>

          <div style={row}>
            <label style={label}>Firstname *</label>
            <input name="firstname" onChange={handleChange} style={input} />
          </div>

          <div style={row}>
            <label style={label}>Middle Name</label>
            <input name="middlename" onChange={handleChange} style={input} />
          </div>

          <div style={row}>
            <label style={label}>Email *</label>
            <input name="email" onChange={handleChange} style={input} />
          </div>

          <div style={row}>
            <label style={label}>Email again *</label>
            <input name="email2" onChange={handleChange} style={input} />
          </div>
        </div>

        {/* LOGIN INFO */}
        <div style={boxStyle}>
          <h3>LOGIN INFORMATION</h3>

          <div style={row}>
            <label style={label}>Username *</label>
            <input name="username" onChange={handleChange} style={input} />
          </div>

          <div style={row}>
            <label style={label}>Password *</label>
            <input type="password" name="password" onChange={handleChange} style={input} />
          </div>

          <div style={row}>
            <label style={label}>Password again *</label>
            <input type="password" name="password2" onChange={handleChange} style={input} />
          </div>

          <p style={{ color: "red", textAlign: "center" }}>
            STORE YOUR LOGIN DETAILS SAFELY
          </p>
        </div>

        {/* PERSONAL INFO */}
        <div style={boxStyle}>
          <h3>PERSONAL INFORMATION</h3>

          <div style={row}>
            <label style={label}>Gender *</label>
            <select name="gender" onChange={handleChange} style={input}>
              <option value="">Choose</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>

          <div style={row}>
            <label style={label}>Phone *</label>
            <input name="phone" onChange={handleChange} style={input} />
          </div>
        </div>

        {/* PROGRAMME */}
        <div style={boxStyle}>
          <h3>PROGRAMME</h3>

          <div style={row}>
            <label style={label}>Programme *</label>
            <select name="programme" onChange={handleChange} style={input}>
              <option value="">Choose</option>
              <option>Pre-Degree</option>
              <option>IJMB</option>
              <option>JAMB</option>
              <option>SSCE</option>
              <option>TECH</option>
              <option>VOCATIONS</option>
            </select>
          </div>
        </div>

        {/* AGREEMENT */}
        <div style={boxStyle}>
          <h3>AGREEMENT</h3>

          <p>
            You agree that all information provided is valid and true.
          </p>
        </div>

        {/* BUTTONS */}
        <div style={{ textAlign: "center" }}>
          <button onClick={signup} style={{
            padding: 10,
            background: "#1e4d7b",
            color: "white",
            border: "none",
            width: 200,
            marginRight: 10
          }}>
            Create Account
          </button>

          <button onClick={() => navigate("/login")} style={{
            padding: 10,
            background: "#ccc",
            border: "none",
            width: 200
          }}>
            Cancel
          </button>
        </div>

        {/* SOCIAL MEDIA */}
        <div style={{ textAlign: "center", marginTop: 30 }}>
          <p style={{ color: "#1e4d7b", fontWeight: "bold" }}>
            Follow SASH Learning Hub
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>

            <a href="https://instagram.com/YOUR_PAGE" target="_blank" rel="noreferrer" style={socialBtn}>
              📸 Instagram
            </a>

            <a href="https://facebook.com/YOUR_PAGE" target="_blank" rel="noreferrer" style={socialBtn}>
              📘 Facebook
            </a>

            <a href="https://youtube.com/@YOUR_CHANNEL" target="_blank" rel="noreferrer" style={socialBtn}>
              ▶ YouTube
            </a>

            <a href="https://x.com/YOUR_HANDLE" target="_blank" rel="noreferrer" style={socialBtn}>
              🐦 Twitter/X
            </a>

          </div>
        </div>

      </div>
    </div>
  );
}