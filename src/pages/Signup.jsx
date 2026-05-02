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
    // VALIDATIONS
    if (!form.firstname || !form.surname || !form.email || !form.password) {
      return alert("Please fill all required fields");
    }

    if (form.email !== form.email2) {
      return alert("Emails do not match");
    }

    if (form.password !== form.password2) {
      return alert("Passwords do not match");
    }

    if (form.password.length < 6) {
      return alert("Password must be at least 6 characters");
    }

    try {
      await API.post("/auth/signup", {
        firstName: form.firstname,
        lastName: form.surname,
        middleName: form.middlename,
        username: form.username,
        email: form.email,
        password: form.password,
        role: "student",
        phone: form.phone,
        gender: form.gender,
        programme: form.programme,
        source: form.source,
        other: form.other
      });

      alert("Account created successfully");
      navigate("/login");

    } catch (err) {
      console.log(err);
      alert(err?.response?.data?.message || "Signup failed");
    }
  };

  // STYLES
  const box = {
    border: "1px solid #3b79b7",
    background: "#fff",
    padding: 15,
    marginBottom: 20
  };

  const row = {
    display: "flex",
    alignItems: "center",
    marginBottom: 10,
    flexWrap: "wrap"
  };

  const label = {
    width: 220
  };

  const input = {
    padding: 6,
    width: 250,
    border: "1px solid #999"
  };

  return (
    <div style={{ fontFamily: "Arial", background: "#f5f5f5", minHeight: "100vh" }}>

      {/* HEADER */}
      <div style={{
        background: "linear-gradient(to right, #1e4d7b, #3b79b7)",
        color: "white",
        padding: 15,
        display: "flex",
        alignItems: "center",
        gap: 10
      }}>
        <img src={logo} alt="logo" style={{ width: 50 }} />
        <h2>SASH Learning Hub</h2>
      </div>

      <div style={{ width: "90%", maxWidth: 900, margin: "20px auto" }}>

        <h2>Create Account</h2>

        {/* PERSONAL DATA */}
        <div style={box}>
          <h3>Personal Data</h3>

          <div style={row}>
            <label style={label}>Surname *</label>
            <input name="surname" onChange={handleChange} style={input} />
          </div>

          <div style={row}>
            <label style={label}>First Name *</label>
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
            <label style={label}>Confirm Email *</label>
            <input name="email2" onChange={handleChange} style={input} />
          </div>
        </div>

        {/* LOGIN INFO */}
        <div style={box}>
          <h3>Login Information</h3>

          <div style={row}>
            <label style={label}>Username *</label>
            <input name="username" onChange={handleChange} style={input} />
          </div>

          <div style={row}>
            <label style={label}>Password *</label>
            <input type="password" name="password" onChange={handleChange} style={input} />
          </div>

          <div style={row}>
            <label style={label}>Confirm Password *</label>
            <input type="password" name="password2" onChange={handleChange} style={input} />
          </div>
        </div>

        {/* PERSONAL INFO */}
        <div style={box}>
          <h3>Personal Information</h3>

          <div style={row}>
            <label style={label}>Gender *</label>
            <select name="gender" onChange={handleChange} style={input}>
              <option value="">Select</option>
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
        <div style={box}>
          <h3>Programme</h3>

          <div style={row}>
            <label style={label}>Programme *</label>
            <select name="programme" onChange={handleChange} style={input}>
              <option value="">Select</option>
              <option>IJMB</option>
              <option>JAMB</option>
              <option>SSCE</option>
              <option>TECH</option>
              <option>VOCATIONS</option>
            </select>
          </div>
        </div>

        {/* BUTTONS */}
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <button onClick={signup} style={{
            padding: 12,
            background: "#1e4d7b",
            color: "#fff",
            border: "none",
            width: 200,
            marginRight: 10
          }}>
            Create Account
          </button>

          <button onClick={() => navigate("/login")} style={{
            padding: 12,
            background: "#ccc",
            border: "none",
            width: 200
          }}>
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}