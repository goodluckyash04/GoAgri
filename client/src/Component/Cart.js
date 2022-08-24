import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../Context/products/Cartstate";
import CartItems from "./CartItems";

export default function Cart() {
  
  const mycart = useContext(CartContext)
  const navigate =  useNavigate()
  const {cartList,fetchcart,deletecartorder,increase} = mycart
  
  useEffect(()=>{
    fetchcart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  return (
    <div className="container mt-5 text-success " style={{ minHeight: "75vh" }}>
      {cartList.length? (cartList.map((item,index)=>
         <CartItems key={index} item={item} deletecartorder={deletecartorder} increase={increase}/>
      )):( <div className="text-center" style={{ minHeight: "55vh" }}><p className="fs-4 text-center" >Add Item to cart</p>
      <Link className='btn btn-outline-success' to="/product">Continue Shopping &rarr;</Link></div>)}
      <div className="row mb-3">
        <div className="col-12 text-end">
          <button className="btn btn-outline-success" disabled={!cartList.length} onClick={()=>{navigate("/ordernow")}}>Order Now</button>
        </div>
      </div>
    </div>
  );
}
