import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AdminSignup() {
  const [details, setDetails] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    adminkey: "",
  });
  const { name, email, password, cpassword, adminkey } = details;
  const navigate = useNavigate();
  const signup = async (e) => {
    e.preventDefault();
    if (adminkey === process.env.REACT_APP_ADMIN_KEY) {
      const response = await fetch(
        "/api/authadmin/createadmin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );
      const json = await response.json();
      if (json.success) {
        navigate("/adminlogin");
      } else {
        alert("user not created");
      }
    } else {
      alert("invalid key");
    }
  };

  const onChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };
  return (
    <form
      className="container my-5"
      onSubmit={(e) => {
        signup(e);
      }}
    >
      <div className="row justify-content-center">
        <div className="col-md-4 mt-2">
          <h3 className="text-success align-self-center mb-4">
            Create Admin Account
          </h3>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              onChange={(e) => {
                onChange(e);
              }}
              minLength={4}
              placeholder="Enter your Name*"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              onChange={(e) => {
                onChange(e);
              }}
              placeholder="Enter your Email*"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              minLength={5}
              onChange={(e) => {
                onChange(e);
              }}
              placeholder="Enter Password*"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="cpassword"
              name="cpassword"
              onChange={(e) => {
                onChange(e);
              }}
              placeholder="Re-enter Password*"
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="adminkey"
              name="adminkey"
              onChange={(e) => {
                onChange(e);
              }}
              placeholder="Enter Key*"
              required
            />
          </div>

          <button
            type="submit"
            disabled={password !== cpassword}
            className="btn btn-success mb-4 "
          >
            Create Account
          </button>
          <br />
          <Link to="/adminlogin" className="btn btn-outline-success me-5">
           Login
          </Link>
        </div>
      </div>
    </form>
  );
}
