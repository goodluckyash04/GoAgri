import React, {  useEffect, useState } from 'react'


export default function CartItems(props) {
  const [qty,setQty]=useState(1)
  useEffect(()=>{
    props.increase(props.item._id,qty)
  },[qty])
  return (
    <div className="row border-bottom mb-5" >
        <div className="col-9 col-md-5">
          <h3>{props.item.title}</h3>
        </div>
        <div className="col-3 col-md-2 text-center">
          <div
            className="btn-group btn-group-sm"
            role="group"
            aria-label="Small button group"
          >
            <input  type="number" value={qty} style={{width:"3rem",borderRadius:"0.5rem", borderColor:"green", textAlign:"center"}} onChange={(e)=>qty>0?setQty(e.target.value):setQty(1)}/>
          </div>
        </div>
        <div className="col-4 col-md-2 text-center">
          <h4>{props.item.price}</h4>
        </div>
        <div className="col-4 col-md-2 text-center">
          <h4>{props.item.price*qty}</h4>
        </div>
        <div className="col-4 col-md-1 text-center">
          <button className="border-0 bg-white">
            <i className="fa-solid  fa-trash text-danger" onClick={()=>{props.deletecartorder(props.item._id)}}></i>
          </button>
        </div>
      </div>
  )
}
