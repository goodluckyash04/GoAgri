import React, { useContext, useState } from "react";
import { ProductContext } from "../Context/products/Productstate";
import AdminProductList from "./AdminProductList";


export default function AddProduct() {

  const [detail,setDetail]=useState({title:"",price:"",quantity:"",imageURL:"",category:""})
  const {title,price,category,quantity,imageURL}=detail

  const {addproduct}=useContext(ProductContext)
 
  const add=(e)=>{
    e.preventDefault()
    addproduct(title,price,category,quantity,imageURL)
    setDetail({title:"",price:"",quantity:"",imageURL:"",category:""})
  }
  
  const onChange=(e)=>{
    setDetail({...detail,[e.target.name]:e.target.value})
  }
  
  return (
    <div style={{backgroundColor:"#9dca9d85",minHeight:"74vh"}}>
    <form className="container mt-2" onSubmit={add}>
      <div className="row justify-content-center">
        <div className="col-md-6 mt-5">
          <h3 className="text-success mb-4">Add Product</h3>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={title}
              required
              onChange={(e)=>{onChange(e)}}
              placeholder="Product title*"
             
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="imageURL"
              name="imageURL"
              value={imageURL}
              required
              onChange={(e)=>{onChange(e)}}
              placeholder="Enter Image URL"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="price"
              name="price"
              value={price}
              required
              onChange={(e)=>{onChange(e)}}
              placeholder="Enter Price*"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="quantity"
              name="quantity"
              value={quantity}
              required
              onChange={(e)=>{onChange(e)}}
              placeholder="Enter Quantity*"
            />
          </div>
          <div className="mb-3">
            <select className="form-select" aria-label="Default select example"
            name="category"
            value={category}
            required
            onChange={(e)=>{onChange(e)}}>
              <option defaultValue={null}>Category</option>
              <option value="fruits">Fruits</option>
              <option value="vegetables">Vegetables</option>
              <option value="seeds">Seeds</option>
              <option value="fertilizers">Fertilizer</option>
            </select>
          </div>

          <button type="submit" className="btn btn-success mb-4">
            ADD
          </button>
          <br />
        </div>
      </div>
    </form> 
    
    <AdminProductList/>    
    </div>
    
  );
}

