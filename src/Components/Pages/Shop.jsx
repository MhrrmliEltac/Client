import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchDataCategory,
  fetchProductData,
  filterByCategory,
} from "../Redux/Slice/productSlice";
import Loader from "../muii/Loader";
import { addFavoriteProduct } from "../Redux/Slice/favouriteSlice";
import { Link, useNavigate } from "react-router-dom";
import { MdAddShoppingCart } from "react-icons/md";
import { addToCartProducts, increment } from "../Redux/Slice/addToCart";
import Product from "../ProductItem/Product";
import CategoryProduct from "../ProductItem/CategoryProduct";

const Shop = () => {
  const [show, setShow] = useState(false);
  const [underline, setUnderline] = useState("All");

  const dispatch = useDispatch();

  const handleProductCategory = (category) => {
    dispatch(filterByCategory(category));
    setShow(true);
    setUnderline("All");
  };

  return (
    <section className="shop-section">
      <div className="container-product">
        <div className="category-lis">
          <ul className="category-list">
            <li>
              <p
                onClick={() => handleProductCategory("all")}
                className={`item ${underline === "All" ? "active" : ""}`}
              >
                All Products
              </p>
            </li>
            <li>
              <p
                onClick={() => {
                  handleProductCategory("women's clothing");
                  setUnderline("Women");
                }}
                className={`item ${underline === "Women" ? "active" : ""}`}
              >
                Women
              </p>
            </li>
            <li>
              <p
                onClick={() => {
                  handleProductCategory("men's clothing");
                  setUnderline("Men");
                }}
                className={`item ${underline === "Men" ? "active" : ""}`}
              >
                Men
              </p>
            </li>
            <li>
              <p
                onClick={() => {
                  handleProductCategory("jewelery");
                  setUnderline("Jewelery");
                }}
                className={`item ${underline === "Jewelery" ? "active" : ""}`}
              >
                Jewelery
              </p>
            </li>
            <li>
              <p
                onClick={() => {
                  handleProductCategory("electronics");
                  setUnderline("Electronics");
                }}
                className={`item ${
                  underline === "Electronics" ? "active" : ""
                }`}
              >
                Electronics
              </p>
            </li>
          </ul>
          <div className="buttons">
            <button className="filter">
              <i className="fa-solid fa-filter"></i>Filter
            </button>
            <button className="search">
              <i className="fa-solid fa-magnifying-glass"></i>Search
            </button>
          </div>
        </div>
      </div>
      {!show ? <Product /> : <CategoryProduct />}
    </section>
  );
};

export default Shop;
