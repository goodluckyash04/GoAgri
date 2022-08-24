import React from "react";

export default function Adminproducts(props) {
    const {title,price,category,quantity,imageURL,_id}= props.product
  return (
    <tr>
      <td scope="col">{title}</td>
      <td scope="col">{price}</td>
      <td scope="col">{category}</td>   
      <td scope="col">{quantity}</td>
      <td scope="col">{imageURL}</td>
      <td scope="col"><i className="fa-solid fa-pen text-warning" onClick={()=>{props.editproduct(props.product)}}></i></td>
      <td scope="col"><i className="fa-solid fa-trash text-danger" onClick={()=>{props.delproduct(_id)}}></i></td>
    </tr>
  );
}