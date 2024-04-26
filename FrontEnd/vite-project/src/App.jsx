import React from "react";
import { Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Footer from "./components/footer";
import ProductDetail from "./pages/productDetail";
import Cart from "./pages/cart";

function App() {
  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="src\styles\reset.css" />
      </Helmet>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<ProductDetail/>}/>
        <Route path="/cart" element={<Cart/>}/>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
