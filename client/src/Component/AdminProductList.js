import React, { useContext, useEffect, useRef, useState } from "react";
import { ProductContext } from "../Context/products/Productstate";
import Adminproducts from "./Adminproducts";

export default function AdminProductList() {
  const ref=useRef()
  const refcl=useRef()
  const [details,setDetails] = useState({id:"",etitle:"",eprice:"",ecategory:'',equantity:"",eimageURL:""})
  const {id,etitle,eprice,ecategory,equantity,eimageURL} = details
  const adminproducts = useContext(ProductContext);
  const { product, viewproduct, fetchmyproduct, deleteproduct,editproduct } = adminproducts;
  useEffect(() => {
    if (localStorage.getItem("admintoken")) {
      fetchmyproduct();
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const edit=(cnote)=>{
    ref.current.click()
    setDetails({id:cnote._id,
      etitle:cnote.title,
      eprice:cnote.price,
      ecategory:cnote.category,
      equantity:cnote.quantity,
      eimageURL:cnote.imageURL})
    
  }
  const onChange=(e)=>{
    setDetails({...details,[e.target.name]:e.target.value})
  }

  const save=()=>{
    refcl.current.click()
    editproduct(id,etitle,eprice,ecategory,equantity,eimageURL)
  }
   
  return (
    <div className="container-fluid">
      <h2 className="text-success text-center border-bottom border-success">
        My Product List - {viewproduct.length} Items Added
      </h2>
      <div className="table-responsive"> 
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Category</th>
            <th scope="col">Quantity</th>
            <th scope="col">imageURL</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {viewproduct ? (
            viewproduct.map((pro) => {
              return (
                <Adminproducts
                  product={pro}
                  key={pro.title}
                  delproduct={deleteproduct}
                  editproduct={edit}
                />
              );
            })
          ) : (
            <p>Add Product</p>
          )}
        </tbody>
      </table>
      </div>
      {/* ...........................Edit Product.................. */}
      <div>
       
        <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
         EDIT
        </button>
      
        <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit Product</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>

              <div className="modal-body">
              <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="title"
              name="etitle"
              value={etitle}
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
              name="eimageURL"
              value={eimageURL}
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
              name="eprice"
              value={eprice}
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
              name="equantity"
              value={equantity}
              required
              onChange={(e)=>{onChange(e)}}
              placeholder="Enter Quantity*"
            />
          </div>
          <div className="mb-3">
            <select className="form-select" aria-label="Default select example"
            name="ecategory"
            value={ecategory}
            required
            onChange={(e)=>{onChange(e)}}>
              <option defaultValue={null}>Category</option>
              <option value="fruits">Fruits</option>
              <option value="vegetables">Vegetables</option>
              <option value="seeds">Seeds</option>
              <option value="fertilizers">Fertilizer</option>
            </select>
          </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary d-none" ref={refcl} data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={save}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

