import React, { useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CartContext } from '../Context/products/Cartstate'

export default function OrderNow(props) {
  const cart = useContext(CartContext)
  const {cartList,fetchcart,deletecartorder,addtoorder} = cart
  const navigate = useNavigate()
  // useEffect(()=>{
  //   // fetchcart()
   
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // },[])
  const char = "012pqrs3defghijk4589abclmno67tuvwxyz"
    let orderId=cartList[0].user.slice(-5)
    for (var i = 0; i <= 8; i++) {
      var randomNumber = Math.floor(Math.random() * char.length);
      orderId += char.substring(randomNumber, randomNumber +1)
     }
     let total = 0
     cartList.map((item)=>{
       total+= item.price*item.quantity})
      const cdate = new Date().toDateString().slice(4);
  const paynow=()=>{
    props.alert("Payment Successful","success")
    addtoorder(orderId,total,cdate)
    cartList.map((item)=>{
      deletecartorder(item._id)
      fetchcart()
      return navigate("/product")
    })
  }
 
  return (
    <div className="container mt-3 " style={{minHeight:"73vh"}}>
        <h2 className='text-success'>Order Summary</h2>
        <div className="row my-3 text-success border-bottom">
          <div className="col-2 col-md-2">
            <h4 >
              Qty.
            </h4>
          </div>
          <div className="col-5 col-md-6">
            <h4>
              Item
            </h4>
          </div>
          <div className="col-4 col-md-3">
            <h4>
              Total
            </h4>
          </div>
        </div>
        {cartList.length?cartList.map((item,index)=>{
          return <div className="row border-bottom" key={index}>
          <div className="col-1 col-md-2">
            <p className="fs-5">
              {item.quantity}
            </p>
          </div>
          <div className="col-6 col-md-6">
            <p className="fs-5">
            {item.title}
            </p>
          </div>
          <div className="col-4 col-md-3">
            <p className="fs-5">
            ₹ {item.price*item.quantity}
            </p>
          </div>
          <div className="col-1 col-md-1">
          <i className="fa-solid  fa-trash text-danger" onClick={()=>{deletecartorder(item._id)}}></i>
          </div>
        </div>
        }):<div className='text-center mt-5'><p className='fs-5 text-secondary'>Order Placed Successful</p>
        <Link className='btn btn-outline-success' to="/product">Continue Shopping &rarr;</Link></div>}
        <div className="row mt-5">
          <div className="col-8 col-md-8 text-end">
            <h4>SubTotal</h4>
          </div>
          <div className="col-4 col-md-3">
            <h4>₹ {total}</h4>
          </div>
        </div>
        <div className='text-end '>
        <button className="btn btn-outline-success my-5 " disabled={!cartList.length} onClick={paynow}> Pay ₹ {total}</button>
        </div>
    </div>
  )
}
