import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../Context/products/Cartstate";
import { OrderContext } from "../Context/products/Wishstate";
import EditAccount from "./EditAccount";

export default function Account(props) {
  const navigate = useNavigate()
  const wishlist=useContext(OrderContext)
  const {wish,fetchwishlist,deletewish} = wishlist
  const cart=useContext(CartContext)
  const {cartList,fetchcart,deletecartorder,oDetail,fetchorderlist} = cart
  const [details, setDetails] = useState({
    id: "",
    name: "",
    age: "",
    address: "",
    email: "",
    gender: "",
  });
  const { id, name, age, address, email, gender } = details;
 
  const accountDetail = async () => {
    const response = await fetch("/api/auth/getuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setDetails({
      id: json._id,
      name: json.name,
      age: json.age,
      address: json.address,
      email: json.email,
      gender: json.gender,
    });
    
  };
  
  useEffect(() => {
    accountDetail();
    fetchorderlist()
    fetchwishlist();
    fetchcart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
 
  localStorage.setItem("userid",id)
// ................................Delete Account...................
  const userdelete=async (id)=>{
    let x= prompt("Account will be deleted permenantly..Press Y to Countinue")
    if(x==="y" || x==="Y"){
      const response = await fetch(`/api/auth/deleteuser/${id}`, {
        method: 'DELETE',
      });
      const json =await response.json();
      props.alert("Account Deleted","success")
      wish.map((item)=>deletewish(item._id))
      cartList.map((item)=>deletecartorder(item._id))
      localStorage.removeItem("token")
      navigate("/login")
    }  
  }
    
  return (
    <div className="container" style={{ minHeight: "70vh" }}>
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 mt-5">
          <h3 className="text-center ">
            Hey <span className="text-success">{name.toUpperCase()}</span>
          </h3>
          <p className="text-center text-success fs-3"> Welcome to Go-Agri</p>
          <div className="fs-5 mt-5 p-3">
          
            <p>
              UserId: <b className="text-success">{id.slice(-5)}</b>
            </p>
            <p>
              Name: <b className="text-success">{name}</b>
            </p>
            <p>
              Age:<b className="text-success"> {age}</b>
            </p>
            <p>
              Address:<b className="text-success"> {address}</b>
            </p>
            <p>
              Gender: <b className="text-success">{gender}</b>
            </p>
            <p>
              Email: <b className="text-success">{email}</b>
            </p>
           
          </div>
        </div>
      </div>
      <div className="row justify-content-between">
        <div className="mb-5 col-3"> <EditAccount detail={details} acdetail={ accountDetail} alert={props.alert}/></div>
      <Link  className="col-2 text-success" to="/resetpassword">Reset Password</Link>
        <button className="btn btn-success mb-5 me-2  col-3" onClick={()=>{userdelete(id)}}>
           Delete Account
        </button>
      </div>
      <div className=" mt-3 p-3">
        <h3 className="text-success my-3">Order Detail</h3>
        <div className="row" >
              <div className="col-1">
              <h4><b className="text-success">Sr.</b></h4>
              </div>
              <div className="col-2">
              <h4><b className="text-success">Date</b></h4>
              </div>
              <div className="col-6">
              <h4><b className="text-success">OrderId</b></h4>
              </div>
              <div className="col-3">
              <h4><b className="text-success">Amount</b></h4>
              </div>
            </div>
            {oDetail && oDetail.map((o,i)=>{
             return <div className="row mt-2 fs-5" key={i}>
              <div className="col-1">
                {i+1}
              </div>
              <div className="col-2">
              <p>{o.date}</p>
              </div>
              <div className="col-6">
              <p>{o.orderId}</p>
              </div>
              <div className="col-3">
              <p> ₹ {o.total}</p>
              </div>
            </div>
            })}
          </div>
    </div>
  );
}
