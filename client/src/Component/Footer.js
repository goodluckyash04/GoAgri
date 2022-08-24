import React from "react";

export default function Footer() {
  const footer = {
    backgroundColor: "#198754",
    color: "white",
    width: "100%",
    minHeight: "10vh",
  };
  return (
    <div className="container-fluid d-flex justify-content-around" style={footer}>
      <div className="p-3 ps-5 fs-4">
        &copy; 2022 Go-Agri Agriculture Hub Pvt Ltd.
      </div>
      <div className="p-3">Contact Us
        <button className="btn btn-success ">
          <i className="fa-solid fa-phone"></i> 1800 444 444
        </button>
      </div>
    </div>
  );
}
