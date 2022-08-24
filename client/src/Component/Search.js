import React, { useContext } from 'react'
import { useState } from 'react';
import { ProductContext } from '../Context/products/Productstate';
import ProductList from './ProductList';

export default function Search() {
    const myproduct=useContext(ProductContext);
    const {product} = myproduct
    
    const [value, setValue] = useState("")

  return (
    <div className="container mt-5" style={{minHeight:"75vh"}}>
        <input type="text" className="form-control" placeholder="Search..." aria-label="Username" onChange={(e)=>{setValue(e.target.value)}} />
        <div className="row">
  {value && product.filter((item)=>{return (item.title).toLowerCase().includes(value.toLowerCase())}).map((prdct)=>{
    return  <ProductList product={prdct} key={prdct.title}/> 
  })}
</div>
    </div>
  )
}




