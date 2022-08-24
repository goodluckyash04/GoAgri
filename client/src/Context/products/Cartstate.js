
import React, { createContext, useState } from 'react'

export const CartContext = createContext()
export default function Cartstate(props) {
    const [cartList,setCartList]=useState([]) 
    const [oDetail,setODetail] = useState([])
    const host = "/api/user/cart"
    //.....................add product to order.................
const addtocart =async (title,price,quantity=1)=>{
    const response = await fetch(`${host}/addtocart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem("token")
      },
      body: JSON.stringify({title,price,quantity})
      
    });
   const json= await response.json();
   setCartList(cartList.concat(json)) 
   
  }
    //.............................Delete Product...............
  const deletecartorder=async (id)=>{
    const response = await fetch(`${host}/deletecartorder/${id}`, {
      method: 'DELETE',
      headers: {
        // 'Content-Type': 'application/json',
        'auth-token':localStorage.getItem("token")
      }
    });
   const json= await response.json();
   console.log(json)
   const myorder=cartList.filter((product)=>{return product._id !== id})
   setCartList(myorder)
  }
  
  //.......................fetch cart by user.................
  const fetchcart =async ()=>{
    const response = await fetch(`${host}/fetchcart`, {
      method: 'GET',
      headers: {
        'auth-token':localStorage.getItem("token")
      }
    });
   const json= await response.json();
   setCartList(json)
  }
  const increase =(id,qty)=>{
         const newl =[...cartList] 
        const newQ=newl.filter((item)=>{return (item._id===id)})
        newQ[0].quantity=qty
          const i=newl.indexOf(newQ[0])
          newl.splice(i,1,newQ[0])
        setCartList(newl)
  }
 //............................fetch OrderList.................
  const fetchorderlist =async ()=>{
    const response = await fetch(`/api/user/orderdetail/fetchorderlist`, {
      method: 'GET',
      headers: {
        'auth-token':localStorage.getItem("token")
      }
    });
   const json= await response.json();
   setODetail(json)
  }
  //............................Add to OrderList.................
  const addtoorder =async (orderId,total,date)=>{
    const response = await fetch(`/api/user/orderdetail/addtoorder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem("token")
      },
      body: JSON.stringify({orderId,total,date})
      
    });
   const json= await response.json();
   setODetail(oDetail.concat(json)) 
   
  }
  return (
    <CartContext.Provider value={{cartList,addtocart,fetchcart,deletecartorder,increase,oDetail,addtoorder,fetchorderlist}}> 
    {props.children}
   </CartContext.Provider>
  )
}
