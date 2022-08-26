import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { ProductContext } from "../Context/products/Productstate";
import ProductList from "./ProductList";
import { useNavigate } from "react-router-dom";
export default function Search() {
  const myproduct = useContext(ProductContext);
  const { product, fetchproduct } = myproduct;
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const searchcl = () => {
    if (value) {
      const pro = product.filter((item) => item.title.toLowerCase() === value);
      navigate(`/product/${pro[0]._id}`);
      setValue("");
    } else {
      navigate("/searchpage");
    }
  };
  useEffect(() => {
    fetchproduct();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <div className="row">
        <div className="col-10">
          <input
            className="form-control"
            list="datalistOptions"
            id="exampleDataList"
            placeholder="Type to search..."
            value={value}
            onChange={(e) => {
              setValue(e.target.value.toLowerCase());
            }}
          />
          <datalist id="datalistOptions">
            {value &&
              product
                .filter((item) => {
                  return item.title.toLowerCase().includes(value.toLowerCase());
                })
                .map((prdct) => {
                  return (
                    <option value={prdct.title} key={prdct._id}>
                      {" "}
                    </option>
                  );
                })}
          </datalist>
        </div>
        <div className="col-2 mt-2">
          <i className="fa-solid fa-magnifying-glass" onClick={searchcl}></i>
        </div>
      </div>
    </div>
  );
}

export function SearchPage() {
  const myproduct = useContext(ProductContext);
  const { product } = myproduct;
  const [value, setValue] = useState("");
  
  return (
    <div className="container mt-5" style={{ minHeight: "66vh" }}>
      <input
        type="text"
        className="form-control"
        placeholder="Search..."
        aria-label="Username"
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <div className="row">
        {value &&
          product
            .filter((item) => {
              return item.title.toLowerCase().includes(value.toLowerCase());
            })
            .map((prdct) => {
              return <ProductList product={prdct} key={prdct.title} />;
            })}
      </div>
    </div>
  );
}
