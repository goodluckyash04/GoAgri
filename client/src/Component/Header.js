import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../Context/products/Cartstate";

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
    props.alert("Logged Out","success")
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
            <div className="navbar-nav" style={{ zIndex: 2 }}>
              <Link className="nav-link active" aria-current="page" to="/">
                HOME
              </Link>
              <Link className="nav-link active" to="/product">
                PRODUCTS
              </Link>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle active"
                  to="/"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  CATEGORY
                </Link>
                <ul className="dropdown-menu" style={{width:"100vh",backgroundColor:"#aeeeb9"}}>
                  <li>
                    <Link className="dropdown-item " to="/product/fruits">
                      Fruits
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item " to="/product/vegetables">
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
              <Link to="/search" className="nav-link active">
                SEARCH &nbsp;
                <i className="fa-solid fa-magnifying-glass"></i>
              </Link>
            </div>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {localStorage.getItem("token") ? (
                !localStorage.getItem("token") ? (
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/login"
                    >
                      <i className="fa-regular fa-user"></i>&nbsp;&nbsp;LOGIN
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
                        <i className="fa-regular fa-heart"></i>
                        &nbsp;&nbsp;WISHLIST
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link active position-realtive"
                        aria-current="page"
                        to="/cart"
                      >
                        <i className="fa-solid fa-cart-shopping"></i>
                        &nbsp;&nbsp;CART
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
                        <i className="fa-regular fa-user"></i>
                        &nbsp;&nbsp;ACCOUNT
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link active"
                        aria-current="page"
                        to="/login"
                        onClick={logout}
                      >
                        <i className="fa-solid fa-right-from-bracket"></i>
                        &nbsp;&nbsp;LOGOUT
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
                    <i className="fa-regular fa-user"></i>&nbsp;&nbsp;LOGIN
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
                      <i className="fa-solid fa-cart-shopping"></i>
                      &nbsp;&nbsp;Product
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/adminlogin"
                      onClick={alogout}
                    >
                      <i className="fa-solid fa-right-from-bracket"></i>
                      &nbsp;&nbsp;LOGOUT
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
