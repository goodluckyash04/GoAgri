import React, { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom'

export default function Resetpsw(props) {
  const [user,setUser]=useState([])
  const [detail,setDetail]=useState({password:"",cpassword:""})
  const {password}=detail
  const navigate = useNavigate()
  const id=localStorage.getItem('userid')

  const alluser=async ()=>{
    const response = await fetch(`/api/auth/users`, {
      method: "GET",
    });
    const json = await response.json();
    setUser(json)
  }

  const resetpassword = async (e) => {
    e.preventDefault()
    const response = await fetch(`/api/auth/resetpassword/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({password})
    });
    const json = await response.json();
    let newUser = JSON.parse(JSON.stringify(user))
 for (let i=0;i< user.length;i++){
   const element=newUser[i];
   if(element._id === id){
    newUser[i].password=password
     break;
   }
 }
 setUser(newUser)
 localStorage.removeItem("userid")
 localStorage.removeItem("token")
 navigate("/login")
 props.alert("Password has been Changed Please Login to continue","warning")
  }

  useEffect(() => {
    alluser()
  }, [user])
  
  return (
    <div className="container mt-5" style={{ minHeight: "70vh" }}>
      <div className="row justify-content-center">
        <div className="col-md-6">
        <form onSubmit={(e)=>{resetpassword(e)}}> 
        <div className="mb-3">
          <input type="password" minLength={5} placeholder="Enter New Password" className="form-control" id="password"  onChange={(e)=>setDetail({...detail,password:e.target.value})} />
        </div>
        <div className="mb-3">
          <input type="password" minLength={5} placeholder="Re-Enter Password"  className="form-control" id="cpassword"  onChange={(e)=>setDetail({...detail,cpassword:e.target.value})} />
        </div>
        <button type="submit" disabled={detail.password!==detail.cpassword} className="btn btn-success">Change Password</button>
      </form>
        </div>
      </div>
      
    </div>
  )
}
