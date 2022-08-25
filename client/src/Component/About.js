import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  const abstyle = {
    minHeight: "31rem",
    backgroundColor: "#cef6ce",
    backgroundImage:
      "url(https://www.wbcsd.org/var/site/storage/images/programs/food-and-nature/food-land-use/scaling-positive-agriculture/agriculture-1.5/150723-3-eng-GB/Agriculture-1.5_i1500.jpg)",
  };

  return (
    <div className="container-fluid " style={abstyle}>
      <div className="row justify-content-center ">
        <div className="col-md-12">
          <h2
            className="text-center text-success"
            style={{
              fontFamily: "Roboto",
              fontSize: "3.5rem",
              padding: "8rem 0 0 0"
            }}
          >
            Welcome to Agriculture Hub
          </h2>
          <div className=" text-center text-success ">
            <Link to="/product">
              <button className="btn btn-success text-center">
                Explore &rarr;
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
