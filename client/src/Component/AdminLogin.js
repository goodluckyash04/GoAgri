import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function AdminLogin() {
  const [details,setDetails]=useState({email:"",password:""})
  const {email,password}= details
  const navigate = useNavigate()
 
  const login =async (e)=>{
    e.preventDefault()
      const response = await fetch("/api/authadmin/adminlogin", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email,password}) // body data type must match "Content-Type" header
      });
      const json =await response.json();
      if(json.success){
        localStorage.setItem('admintoken',json.authToken)
        navigate("/addproduct")
      }else{
        alert("Check Credentials")
      }
      
    }
  
  const onChange=(e)=>{
    setDetails({...details,[e.target.name]:e.target.value})
  }
  return (
    <form
      className="container mt-5"
      style={{ minHeight: "67vh" }}
      onSubmit={login}
    >
      <div className="row justify-content-between">
        <div className="d-flex col-md-6">
          <h3 className="text-success align-self-center">Welcome to GO-Agri</h3>
        </div>
        <div className="col-md-6 mt-5">
          <div className="dropdown mb-3">
            <button
              className="btn btn-success dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Admin
            </button>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" to="/login">
                  User
                </Link>
              </li>
            </ul>
          </div>

          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => {
                onChange(e);
              }}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter Password"
              onChange={(e) => {
                onChange(e);
              }}
            />
          </div>
          <button type="submit" className="btn btn-success mb-4">
            Login
          </button>
          <br />
          <Link to="/adminsignup" className=" link-success mb-2 ">
            Create Account ?
          </Link>
        </div>
      </div>
    </form>
  );
}