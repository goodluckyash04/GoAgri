import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../Context/products/Cartstate";
import Search from "./Search";

export default function Header(props) {
  const cart = useContext(CartContext);
  const navigate = useNavigate();
  const navigate1 = useNavigate();

  const alogout = () => {
    localStorage.removeItem("admintoken");
    navigate1("/adminlogin");
  };
  const logout = () => {
    localStorage.removeItem("token");
    props.alert("Logged Out", "success");
    navigate("/login");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success fs-5 fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img
              className="ms-5"
              src="apple-touch-icon.png"
              alt="logo"
              height="80"
            />
          </Link>
          <Link className="navbar-brand" to="/">
            GO-AGRI
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav pt-3" style={{ zIndex: 2 }}>
              <Link className="nav-link active" aria-current="page" to="/">
                <span
                  data-bs-toggle="collapse"
                  data-bs-target=".navbar-collapse.show"
                >
                  HOME
                </span>
              </Link>
              <Link className="nav-link active" to="/product">
                <span
                  data-bs-toggle="collapse"
                  data-bs-target=".navbar-collapse.show"
                >
                  PRODUCTS
                </span>
              </Link>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle active"
                  to="/"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span
                          data-bs-toggle="collapse"
                          data-bs-target=".navbar-collapse.show"
                        >
                  CATEGORY</span>
                </Link>
                <ul
                  className="dropdown-menu"
                  style={{ width: "100vh", backgroundColor: "#aeeeb9" }}
                >
                  <li >
                    <Link className="dropdown-item " to="/product/fruits" >
                      Fruits
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item " to="/product/vegetables" >
                      Vegetables
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/product/seeds">
                      Seeds
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/product/fertilizers">
                      Fertilizers
                    </Link>
                  </li>
                </ul>
              </li>
              <div className="nav-link active">
                <Search /><span data-bs-toggle="collapse"
                  data-bs-target=".navbar-collapse.show"></span>
              </div>
            </div>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {localStorage.getItem("token") ? (
                !localStorage.getItem("token") ? (
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/login"
                      data-bs-toggle="collapse"
                      data-bs-target=".navbar-collapse.show"
                    >
                       <span
                          data-bs-toggle="collapse"
                          data-bs-target=".navbar-collapse.show"
                        >
                          <i className="fa-regular fa-user "></i>&nbsp;&nbsp;LOGIN
                        </span>
                    </Link>
                  </li>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link
                        className="nav-link active"
                        aria-current="page"
                        to="/wishlist"
                      >
                        <span
                          data-bs-toggle="collapse"
                          data-bs-target=".navbar-collapse.show"
                        >
                        <i className="fa-regular fa-heart"></i>
                        &nbsp;&nbsp;WISHLIST</span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link active position-realtive"
                        aria-current="page"
                        to="/cart"
                      >
                        <span
                          data-bs-toggle="collapse"
                          data-bs-target=".navbar-collapse.show"
                        >
                          <i className="fa-solid fa-cart-shopping"></i>
                          &nbsp;&nbsp;CART
                        </span>
                        {cart.cartList.length ? (
                          <span className="position-absolute top-10 translate-middle badge rounded bg-danger">
                            {cart.cartList.length}
                          </span>
                        ) : (
                          ""
                        )}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link active"
                        aria-current="page"
                        to="/myaccount"
                      >
                        <span
                          data-bs-toggle="collapse"
                          data-bs-target=".navbar-collapse.show"
                        >
                        <i className="fa-regular fa-user"></i>
                        &nbsp;&nbsp;ACCOUNT</span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link active"
                        aria-current="page"
                        to="/login"
                        onClick={logout}
                      >
                         <span
                          data-bs-toggle="collapse"
                          data-bs-target=".navbar-collapse.show"
                        >
                        <i className="fa-solid fa-right-from-bracket"></i>
                        &nbsp;&nbsp;LOGOUT</span>
                      </Link>
                    </li>
                  </>
                )
              ) : !localStorage.getItem("admintoken") ? (
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/login"
                  >
                    <span
                          data-bs-toggle="collapse"
                          data-bs-target=".navbar-collapse.show"
                        >
                    <i className="fa-regular fa-user"></i>&nbsp;&nbsp;LOGIN</span>
                  </Link>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/addproduct"
                    >
                      <span
                          data-bs-toggle="collapse"
                          data-bs-target=".navbar-collapse.show"
                        >
                      <i className="fa-solid fa-cart-shopping"></i>
                      &nbsp;&nbsp;Product</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/adminlogin"
                      onClick={alogout}
                    >
                      <span
                          data-bs-toggle="collapse"
                          data-bs-target=".navbar-collapse.show"
                        >
                      <i className="fa-solid fa-right-from-bracket"></i>
                      &nbsp;&nbsp;LOGOUT</span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
