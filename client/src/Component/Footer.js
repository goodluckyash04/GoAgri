import React from "react";

export default function Footer() {
  const footer = {
    backgroundColor: "#198754",
    color: "white",
    width: "100%",
    minHeight: "10vh",
  };
  return (
    <div className="container-fluid justify-content-around" style={footer}>
      <div className="row p-3">
        <div className="col-md-8  fs-4 text-center">
        &copy; 2022 Go-Agri Agriculture Hub Pvt Ltd.
        </div>
        <div className="col-md-4  text-center">
        <button className="btn btn-success ">
          <i className="fa-solid fa-phone"></i> 1800 444 444
        </button>
        </div>
      </div>
    </div>
  );
}
