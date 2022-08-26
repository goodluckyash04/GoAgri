import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../Context/products/Productstate";
import Offer from "./Offer";
import data from "./offer.json";
import ProductList from "./ProductList";
import { Link } from "react-router-dom";

export default function Product() {
  const [isSort, setIsSort] = useState("random");
  const myproducts = useContext(ProductContext);
  const { product, fetchproduct } = myproducts;
  const cat = data.category;
  useEffect(() => {
    fetchproduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Offer />
      <div className="container mt-5" style={{ minHeight: "75vh" }}>
        <div className="row justify-content-around mb-5">
          {cat.map((c, index) => {
            return (
              <div className="col-6 col-md-2 my-3" key={index}>
                <div className="card">
                  <Link to={`/product/${c.title}`}>
                    <img
                      src={c.img}
                      className="card-img-top"
                      alt="..."
                      style={{ minHeight: "10rem", maxHeight: "10rem" }}
                    />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        <div className="d-flex justify-content-between">
          <h3 className="text-success">
            ALL PRODUCTS{" "}
            <span className="fs-5 text-secondary">{product.length} Items</span>{" "}
          </h3>
          <div className="dropdown">
            <button
              className="btn border-0 p-0 dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Sort By
            </button>
            <ul className="dropdown-menu">
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => {
                    setIsSort("lth");
                  }}
                >
                  Price: &uarr; Low to High
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => {
                    setIsSort("htl");
                  }}
                >
                  Price: &darr; High to Low
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          {isSort === "random"
            ? product.map((prdct) => {
                return <ProductList product={prdct} key={prdct.title} />;
              })
            : isSort === "lth"
            ? product
                .sort((a, b) => {
                  return a.price - b.price;
                })
                .map((prdct) => {
                  return <ProductList product={prdct} key={prdct.title} />;
                })
            : product
                .sort((a, b) => {
                  return b.price - a.price;
                })
                .map((prdct) => {
                  return <ProductList product={prdct} key={prdct.title} />;
                })}
        </div>
      </div>
    </>
  );
}
