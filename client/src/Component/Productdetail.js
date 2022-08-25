import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../Context/products/Cartstate";

export default function Productdetail() {
  const [pin, setPin] = useState("");
  const pincodes =["395008","395007","395009","394516","395001","395002","395003","395004"]
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState("");
  const [product, setProduct] = useState({});
  const { addtocart } = useContext(CartContext);
  const { id } = useParams();
  const fetchproduct = async () => {
    const response = await fetch(`/api/product/fetchproducts/${id}`, {
      method: "GET",
    });
    const json = await response.json();
    setProduct(json);
  };
  const pinverify=()=>{
        if(pin.length!==6 || isNaN(pin)){
            setColor("danger")
            setMsg("Enter Valid Pincode!")
        }else if(pincodes.includes(pin)){
                setColor("success")
                setMsg("Product will be delivered within 2 Days")
        }else{
            setColor("warning")
            setMsg("Product can not be delivered at this location") 
            }
    }

  useEffect(() => {
    fetchproduct();
  }, [id]);
  return (
    <div className="container mt-5" style={{ minHeight: "40rem" }}>
      <div className="row">
        <div className="col-md-6">
          <img src={product.imageURL} style={{ maxHeight: "20rem" }} alt="" />
        </div>
        <div className="col-md-6 overflow-auto" style={{ minheight: "20rem" }}>
          <h2 className="text-success">{product.title}</h2>
          <p className="fs-5">
            M.R.P. ₹{" "}
            <span className="fs-2 text-success">
              <b>{product.price}</b>
            </span>
          </p>
          <p className="text-success">
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-regular fa-star-half-stroke"></i>
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit
            beatae, totam nisi repudiandae facilis, accusantium earum unde
            dolore, illum officia ullam dignissimos quae reiciendis eligendi
            optio quia voluptas ipsam laboriosam.
            </p>
              <div className="input-group mb-3 fs-5">
                <input
                  type="text"
                  className="form-control border-0 border-bottom "
                  placeholder="Enter Pincode"
                  aria-describedby="button-addon2"
                  onChange={(e)=>{setPin(e.target.value)}}
                />
                <i
                  className=" border-bottom text-primary"
                  id="button-addon2"
                  onClick={pinverify}
                >
                  check
                </i>
              </div>
              <small className={`text-${color}`}>{msg}</small>
            <h3 className="text-success mt-2">About This Product</h3>
            <p>
            dolores, sapiente nostrum dignissimos pariatur accusantium vel a
            adipisci quis ab ad reprehenderit aliquam in laudantium aspernatur
            eos animi. Numquam velit obcaecati dolorem consequuntur tempora
            accusamus architecto ex quo perspiciatis quis repellat modi ipsa
            optio, expedita nesciunt deleniti asperiores earum consequatur
            culpa, atque quidem, totam repudiandae natus unde! Atque quasi totam
            illum maxime hic officiis dolor culpa assumenda, aperiam architecto
            iste iure nisi qui corrupti voluptates, et eum laborum quod. Ut,
            labore dolores eaque deleniti dolor eos in ipsam velit quos
            repellat, placeat nobis asperiores, officiis reprehenderit obcaecati
            ipsa.
          </p>
          <button
            className={`btn btn-success mb-5 ${
              !localStorage.token ? "d-none" : ""
            }`}
            onClick={() => {
              addtocart(product.title, product.price);
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
