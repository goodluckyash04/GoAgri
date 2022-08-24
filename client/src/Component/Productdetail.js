import React, { useContext, useEffect, useState} from 'react'

import {  useParams } from "react-router-dom";
import { CartContext } from '../Context/products/Cartstate';

export default function Productdetail() {
    const [product,setProduct]=useState({})
    const {addtocart}=useContext(CartContext)
    const {id} = useParams()
    const fetchproduct=async ()=>{
        const response = await fetch(`/api/product/fetchproducts/${id}`,{
            method: 'GET'
        })
        const json = await response.json();
        setProduct(json)
    }
    useEffect(() => {
        fetchproduct()
    }, [])
  return (
   <div className='container mt-5' style={{minHeight:"65rem"}}>
 <div className="row"> 
            <div className="col-md-6" >
                <img src={product.imageURL} style={{maxHeight:"20rem"}} alt="" />
            </div>
            <div className="col-6 overflow-auto"  style={{minheight:"20rem"}}>
                <h2 className='text-success'>{product.title}</h2>
                <p className="fs-5">M.R.P. ₹ <span className='fs-2 text-success'><b>{product.price}</b></span></p>
                <p className='text-success'><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-regular fa-star-half-stroke"></i></p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit beatae, totam nisi repudiandae facilis, accusantium earum unde dolore, illum officia ullam dignissimos quae reiciendis eligendi optio quia voluptas ipsam laboriosam. Itaque reprehenderit beatae voluptates, nemo consectetur ab veniam asperiores fugit, saepe dolorum fugiat debitis voluptas ducimus modi. Quo ut eius assumenda tempora ipsam, aliquid inventore voluptates dolore dolores, sapiente nostrum dignissimos pariatur accusantium vel a adipisci quis ab ad reprehenderit aliquam in laudantium aspernatur eos animi. Numquam velit obcaecati dolorem consequuntur tempora accusamus architecto ex quo perspiciatis quis repellat modi ipsa optio, expedita nesciunt deleniti asperiores earum consequatur culpa, atque quidem, totam repudiandae natus unde! Atque quasi totam illum maxime hic officiis dolor culpa assumenda, aperiam architecto iste iure nisi qui corrupti voluptates, et eum laborum quod. Ut, labore dolores eaque deleniti dolor eos in ipsam velit quos repellat, placeat nobis asperiores, officiis reprehenderit obcaecati ipsa. Labore tempora quisquam, ullam ipsa sunt necessitatibus, aliquam amet eius laudantium modi non magni mollitia illum voluptate cumque dolor repudiandae velit quas. Nulla minus molestiae veritatis ipsam hic soluta, aut ad, excepturi temporibus tempore adipisci saepe error mollitia sit consequuntur id natus. Laborum autem quisquam quos minus enim inventore voluptate eaque dolorem eius repudiandae qui deleniti consequuntur expedita, nemo eveniet odio maiores eum tenetur fuga illum harum nulla. Quasi repellat quibusdam omnis numquam dicta nulla quos labore. Repudiandae cupiditate facere voluptatem debitis qui cum veritatis eaque eos iusto et, eius maxime illum nobis rerum, libero totam laboriosam odit voluptatibus. Quis, nesciunt iste cumque eos eveniet dolores numquam consequatur. Quaerat dolore fugit, quas minima possimus blanditiis iure inventore iusto! Nisi, aliquid ducimus similique vero aspernatur error, quis consectetur ad deserunt laborum quaerat necessitatibus enim doloremque. Exercitationem numquam iste deserunt molestiae, quas, cupiditate beatae aliquam quo, soluta eum unde quia praesentium delectus saepe ullam porro non!
                </p>
                <button  className={`btn btn-success ${!localStorage.token?"d-none":""}`} onClick={()=>{addtocart(product.title,product.price)}}>Add to Cart</button>
            </div>
        </div>
    </div>
  )
}
