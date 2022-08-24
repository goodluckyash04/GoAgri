import React, { useContext,useEffect } from 'react'
import { ProductContext } from '../Context/products/Productstate'
import ProductList from './ProductList'

export default function Fruits() {
    const myproducts=useContext(ProductContext)
    const {product,fetchproduct} = myproducts
    const fruits =product.filter((item)=>{return item.category === "fruits"})
    useEffect(()=>{
     fetchproduct()
     // eslint-disable-next-line react-hooks/exhaustive-deps
     },[])
  return (
    <div className="container mt-5" style={{minHeight:"75vh"}}>
    <h3 className='text-success'>Fruits <span className='fs-5 text-secondary'>{fruits.length} Items</span>  </h3>
    <div className="row">
      {fruits.map((prdct)=>{
        return  <ProductList product={prdct} key={prdct.title}/> 
      })}
    </div>
</div>
  )
}
export  function Vegetables() {
  const myproducts=useContext(ProductContext)
    const {product,fetchproduct} = myproducts
    const veg =product.filter((item)=>{return item.category === "vegetables"})
    useEffect(()=>{
      fetchproduct()
      // eslint-disable-next-line react-hooks/exhaustive-deps
     },[])
  return (
    <div className="container mt-5" style={{minHeight:"75vh"}}>
    <h3 className='text-success'>Vegetables <span className='fs-5 text-secondary'>{veg.length} Items</span></h3>
    <div className="row">
      {veg.map((prdct)=>{
        return  <ProductList product={prdct} key={prdct.title}/> 
      })}
    </div>
</div>
  )
}
export  function Seeds() {
  const myproducts=useContext(ProductContext)
  const {product,fetchproduct} = myproducts
    const seeds =product.filter((item)=>{return item.category === "seeds"})
    useEffect(()=>{
      fetchproduct()
      // eslint-disable-next-line react-hooks/exhaustive-deps
     },[])
  return (
    <div className="container mt-5" style={{minHeight:"75vh"}}>
    <h3 className='text-success'>Seeds <span className='fs-5 text-secondary'>{seeds.length} Items</span></h3>
    <div className="row">
      {seeds.map((prdct)=>{
        return  <ProductList product={prdct} key={prdct.title}/> 
      })}
    </div>
</div>
  )
}
export function Fertilizer() {
  const myproducts=useContext(ProductContext)
  const {product,fetchproduct} = myproducts
    const ferti =product.filter((item)=>{return item.category === "fertilizers"})
    useEffect(()=>{
      fetchproduct()
      // eslint-disable-next-line react-hooks/exhaustive-deps
     },[])
  return (
    <div className="container mt-5" style={{minHeight:"75vh"}}>
    <h3 className='text-success'>Fertilizer <span className='fs-5 text-secondary'>{ferti.length} Items</span></h3>
    <div className="row">
      {ferti.map((prdct)=>{
        return  <ProductList product={prdct} key={prdct.title}/> 
      })}
    </div>
</div>
  )
}

