import React, { createContext, useState } from 'react'

export const OrderContext = createContext()
export default function Wishstate(props) {
    const [wish,setWish]=useState([])
    const host = "/api/user"
    //.....................add product to wishlist.................
const addwishlist =async (title,price)=>{
    const response = await fetch(`${host}/addwishlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem("token")
      },
      body: JSON.stringify({title,price})
      
    });
   const json= await response.json();
   setWish(wish.concat(json))
   if(json.error){
    alert(json.error)
   } 
  
   
  }
  
  //.............................Delete Product...............
  const deletewish=async (id)=>{
    const response = await fetch(`${host}/deletewishlist/${id}`, {
      method: 'DELETE',
      headers: {
        // 'Content-Type': 'application/json',
        'auth-token':localStorage.getItem("token")
      }
    });
   const json= await response.json();
   console.log(json.product.title + " is Deleted")
  
   const wisht=wish.filter((product)=>{return product._id !== id})
   setWish(wisht)
  }
  
  //.......................fetch wishlist by user.................
  const fetchwishlist =async ()=>{
    const response = await fetch(`${host}/fetchwishlist`, {
      method: 'GET',
      headers: {
        'auth-token':localStorage.getItem("token")
      }
    });
   const json= await response.json();
   setWish(json)
  }
  return (
    <OrderContext.Provider value={{wish,fetchwishlist,addwishlist,deletewish}}> 
    {props.children}
</OrderContext.Provider>
  )
}
