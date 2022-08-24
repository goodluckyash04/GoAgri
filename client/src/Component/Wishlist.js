import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/products/Cartstate";
import { OrderContext } from "../Context/products/Wishstate";

export default function Wishlist() {
  const mylist = useContext(OrderContext)
  const cart =useContext(CartContext)
  const {addtocart}=cart
  const {wish,fetchwishlist,deletewish} =mylist
  const del=(x)=>{
    deletewish(x)
    fetchwishlist()
  }
  const add=(x,title,price)=>{
    addtocart(title,price)
    del(x)
  }
  useEffect(()=>{
   fetchwishlist()
   // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <div className="container mt-5 text-success " style={{ minHeight: "75vh" }}>
    {wish.length?wish.map((item,index)=>{
      // setDetail({title:item.title,price:item.price})
      return <div className="row mb-5 border-bottom" key={index}>
        <div className="col-5 col-md-6">
          <h3>{item.title}</h3>
        </div>
        <div className="col-2 col-md-2 text-end">
          <h4>{item.price}</h4>
        </div>
        <div className="col-3 col-md-3 text-end">
            <i className="fa-solid fa-cart-plus text-success" onClick={()=>{add(item._id,item.title,item.price)}}></i>
        </div>
        <div className="col-1 col-md-1 text-end">
            <i className="fa-solid  fa-trash text-danger" onClick={()=>{del(item._id)}}></i>
        </div>
      </div>
   
  }):<div className="text-center" style={{ minHeight: "55vh" }}><p className="fs-4 text-center" >Add Item to Wishlist</p>
  <Link className='btn btn-outline-success' to="/product">Go to Shopping &rarr;</Link></div>}
   </div>
  );
}
