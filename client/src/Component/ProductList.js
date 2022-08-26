import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../Context/products/Cartstate";
import { OrderContext } from "../Context/products/Wishstate";
import { Link  } from "react-router-dom";

export default function ProductList(props) {
  const [heart,setHeart]=useState("regular")
  const [disp,setDisp]=useState("")
  const [detail,setDetail]=useState({id:"",price:"",title:"",quantity:1})
  const {price,title,quantity} = detail
  const {addwishlist} =useContext(OrderContext)
  const {addtocart}=useContext(CartContext)
 
  const wishlist =  () => {
    if(localStorage.getItem("token")){
      setHeart("solid")
      addwishlist(title,price)
    }else{
      alert("Please Login to addproduct to Wishlist")
    }
  };
  const addcart = ()=>{
    if(localStorage.getItem("token")){
      addtocart(title,price,quantity)
    }
  }
  useEffect(()=>{
    setDetail({id:props.product._id,title:props.product.title,price:Number(props.product.price)})
    if(!localStorage.getItem("token")){
        setDisp("d-none")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <div className="col-11 col-md-3 my-3">
      <div className="card">
        <Link to={`/product/${props.product._id}`}>
        <img
          src={props.product.imageURL}
          className="card-img-top"
          style={{height:"12rem"}}
          alt="img"
        />
        </Link> 
        <div className="card-body">
          <h5 className="card-title">{props.product.title}</h5>
          <p>
            M.R.P : ₹<span className="fs-4">{props.product.price}</span> /kg
          </p>
           
          <div className="d-flex justify-content-between">
              <i className={`fa-${heart} fa-heart text-success mt-2 fs-4 ${disp}`}  onClick={wishlist}  ></i>
            <button className={`btn btn-success rounded-pill ${disp}`} onClick={addcart} >Add To Cart</button>
          </div>
        </div>
       
      </div>
    </div>
  );
}
