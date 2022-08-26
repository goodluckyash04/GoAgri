import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
//.....................Components...........................
import AdminLogin from "./Component/AdminLogin";
import AdminSignup from "./Component/AdminSignup";
import Header from "./Component/Header";
import Login from "./Component/Login";
import AddProduct from "./Component/AddProduct";
import About from "./Component/About";
import SignUp from "./Component/SignUp";
import Footer from "./Component/Footer";
import Product from "./Component/Product";
import Cart from "./Component/Cart";
import Account from "./Component/Account";
import Productstate from "./Context/products/Productstate";
import Search, { SearchPage } from "./Component/Search";
import OrderNow from "./Component/OrderNow";
import Resetpsw from "./Component/Resetpsw";
import Wishlist from "./Component/Wishlist";
import Alert from "./Component/Alert";
import Fruits, { Fertilizer, Seeds, Vegetables } from "./Component/Category";
// ..................... Context State............................
import Wishstate from "./Context/products/Wishstate";
import Productdetail from "./Component/Productdetail";
import Cartstate from "./Context/products/Cartstate";




function App() {
  const [alert, setAlert] = useState(null)
  const showalert=(msg,type)=>{
      setAlert({msg:msg,type:type})
      setTimeout(()=>{
       setAlert(null) 
      },2000)
  }
  return (
      <Productstate>
        <Wishstate>
          <Cartstate>
            <BrowserRouter>
              <div style={{ minHeight: "100px" }}>
                <Header alert={showalert} />
              </div>
              <Alert alert={alert}/>
              <Routes>
                <Route path="/" element={<About />} />
                <Route path="login" element={<Login alert={showalert} />} />
                <Route path="signup" element={<SignUp alert={showalert}/>} />
                <Route path="adminlogin" element={<AdminLogin />} />
                <Route path="adminsignup" element={<AdminSignup />} />
                <Route path="addproduct" element={<AddProduct />} />
                <Route path="product" element={<Product  />} />
                <Route path="cart" element={<Cart />} />
                <Route path="wishlist" element={<Wishlist />} />
                <Route path="myaccount" element={<Account alert={showalert}  />} />
                <Route path="product/fruits" element={<Fruits />} />
                <Route path="product/vegetables" element={<Vegetables />} />
                <Route path="product/seeds" element={<Seeds />} />
                <Route path="product/fertilizers" element={<Fertilizer />} />
                <Route path="search" element={<Search />} />
                <Route path="ordernow" element={<OrderNow alert={showalert}/>} />
                <Route path="resetpassword" element={<Resetpsw alert={showalert} />} />
                <Route path="product/:id" element={<Productdetail />} />
                <Route path="searchpage" element={<SearchPage />} />
                
              </Routes>
              <Footer />
            </BrowserRouter>
          </Cartstate>
        </Wishstate>
      </Productstate>
  );
}

export default App;
