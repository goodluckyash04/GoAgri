import React ,{  createContext, useState } from 'react'

export const ProductContext = createContext()

export default function Productstate(props) {
  const host="/api/product"
 
  // const [viewlist,setViewlist] = useState([])
  const [product,setProduct] = useState([])
  const [viewproduct,setViewproduct] = useState([])

    
//  ............................fetch all products...........
const fetchproduct =async ()=>{
  const response = await fetch(`${host}/fetchallproducts`, {
    method: 'GET',
  });
 const json= await response.json();
 setProduct(json) 
}

//.......................fetch products by user.................
const fetchmyproduct =async ()=>{
  const response = await fetch(`${host}/fetchproducts`, {
    method: 'GET',
    headers: {
      'auth-token':localStorage.getItem("admintoken")
    }
  });
 const json= await response.json();
 setViewproduct(json)
}
//.......................Add Product...........................
const addproduct =async (title,price,category,quantity,imageURL)=>{
  const response = await fetch(`${host}/addproduct`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'auth-token':localStorage.getItem("admintoken")
    },
    body: JSON.stringify({title,price,category,quantity,imageURL})
  });
 const json= await response.json();
 setProduct(product.concat(json)) 
 
}
//...........................Edit Product......................
const editproduct =async (id,title,price,category,quantity,imageURL)=>{
  const response = await fetch(`${host}/editproduct/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'auth-token':localStorage.getItem("admintoken")
    },
    body: JSON.stringify({id,title,price,category,quantity,imageURL})
  });
 const json= await response.json();
 console.log(json)

 let newProduct = [...product]
 for (let i=0;i< product.length;i++){
   const element=newProduct[i];
   if(element._id === id){
    newProduct[i].title=title
    newProduct[i].price=price
    newProduct[i].category=category
    newProduct[i].quantity=quantity
    newProduct[i].imageURL=imageURL
     break;
   }
 }
 setProduct(newProduct)

}
//.............................Delete Product...............
const deleteproduct =async (id)=>{
  const response = await fetch(`${host}/deleteproduct/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'auth-token':localStorage.getItem("admintoken")
    }
  });
 const json= await response.json();
 console.log(json)
 const newProducts=product.filter((product)=>{return product._id !== id})
 setProduct(newProducts)
}


  return (
     <ProductContext.Provider value={{product,viewproduct,fetchproduct,fetchmyproduct,addproduct,deleteproduct,editproduct}}> 
        {props.children}
    </ProductContext.Provider>
   
  )
}
