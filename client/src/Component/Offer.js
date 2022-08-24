import React from 'react'
import offer from "./offer.json"
export default function Offer() {
    const offers = offer.offers
  return (
    
    <div id="carouselExampleIndicators" className="carousel slide mt-4" data-bs-ride="true">
    {/* <div className="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div> */}
    <div className="carousel-inner">
      <div className="carousel-item active">
        <img src="https://www.jiomart.com/images/cms/aw_rbslider/slides/1660305764_1660178602_Hero-Banner-1680-X320.jpg" className="d-block w-100" alt="..."/>
      </div>
     { offers.map((o,i)=>{return  <div className="carousel-item active" key={i}>
        <img src={o.img} className="d-block w-100" alt="..."/>
      </div>
      })}
      
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
  </div>
  )
}

