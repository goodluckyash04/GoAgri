import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";


export default function SignUp(props) {
  const [details,setDetails]=useState({name:"",email:"",password:"",cpassword:"",age:"",address:"",gender:""})
  const {name,email,password,cpassword,age,address,gender} =details
  const navigate=useNavigate()
  const signup =async (e)=>{
    e.preventDefault()
    setDetails({name,email,password,cpassword,age,address,gender})
    const response = await fetch("/api/auth/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name,email,password,age,address,gender})
  });
  const json = await response.json()
  if(json.success){
    navigate("/login")
    props.alert("Account Created Successfully","success")
  }else{
    props.alert("Error!!! Account Not Created","warning")
  }
}
  
  const onChange=(e)=>{
    setDetails({...details,[e.target.name]:e.target.value})
  }



  return (
    <form className="container my-5" onSubmit={(e)=>signup(e)}>
      <div className="row justify-content-center">
        <div className="col-md-4 mt-2">
          <h3 className="text-success align-self-center mb-4">
            Create A New Account
          </h3>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              onChange={onChange}
              required
              placeholder="Enter your Name*"
              
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              onChange={(e)=>{setDetails({...details,email:e.target.value.toLowerCase()})}}
              required
              placeholder="Enter your Email*"
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={onChange}
              minLength={5}
              required
              placeholder="Enter Password*"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="cpassword"
              name="cpassword"
              onChange={onChange}
              required
              placeholder="Re-enter Password*"
            />
          </div>
          <div className="row">
            <div className="col-6 align-self-center">
              <div className="mb-3">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="male"
                    value="Male"
                  onChange={onChange}
                  />
                  <label className="form-check-label" htmlFor="male">
                    Male
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="female"
                    value="Female"
                    onChange={onChange}
                  />
                  <label className="form-check-label" htmlFor="female">
                    Female
                  </label>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="age"
                  name="age"
                  maxLength={2}
              onChange={onChange}
                  placeholder="Enter your Age"             
                />
              </div>
            </div>
          </div>

          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="Enter Your Address"
              id="address"
              name="address"
              onChange={onChange}
              style={{ height: "100px" }}
            />
          </div>

          <button type="submit" disabled={password!==cpassword} className="btn btn-success mb-4 ">
            Create Account
          </button><br/>
          <Link to="/login" className="btn btn-outline-success me-5">
            Login
          </Link>
        </div>
      </div>
    </form>
  );
}
