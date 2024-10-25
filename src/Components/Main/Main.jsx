import React, { useCallback, useEffect, useMemo, useState } from "react";
import Product from "../ProductItem/Product";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import {
  fetchDataCategory,
  fetchProductData,
  filterByCategory,
} from "../Redux/Slice/productSlice";
import CategoryProduct from "../ProductItem/CategoryProduct";
import banner01 from "../../../public/banner-01.jpg.png";
import banner02 from "../../../public/banner-02.jpg.png";
import banner03 from "../../../public/banner-03.jpg.png";

const Main = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [underline, setUnderline] = useState("All");
  const [searchInp, setSearchInp] = useState(false);

  useEffect(() => {
    dispatch(fetchProductData());
    dispatch(fetchDataCategory());
  }, [dispatch]);

  const handleProductCategory = useCallback(
    (category) => {
      dispatch(filterByCategory(category));
      setShow(true);
      setUnderline("All");
    },
    [dispatch]
  );

  const productContent = useMemo(
    () => (show ? <CategoryProduct /> : <Product />),
    [show]
  );

  const handleShowSearchBox = () => {
    setSearchInp((prev) => !prev);
  };

  return (
    <div className="main-container">
      <section>
        <div className="category">
          <div
            onClick={() => handleProductCategory("women's clothing")}
            className="card-product"
          >
            <div className="description">
              <h3>Women</h3>
              <p>Spring 2018</p>
            </div>
            <div className="img">
              <img width={"100px"} src={banner01} alt="Women" />
            </div>
          </div>
          <div
            onClick={() => handleProductCategory("men's clothing")}
            className="card-product"
          >
            <div className="description">
              <h3>Men</h3>
              <p>Spring 2018</p>
            </div>
            <div className="img">
              <img width={"100px"} src={banner02} alt="Men" />
            </div>
          </div>
          <div
            onClick={() => handleProductCategory("electronics")}
            className="card-product"
          >
            <div className="description">
              <h3>Accessories</h3>
              <p>New Trend</p>
            </div>
            <div className="img">
              <img src={banner03} alt="Accessories" />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container-product">
          <div className="product-overview">
            <h3>Product Overview</h3>
          </div>
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
              <button onClick={handleShowSearchBox} className="search">
                <i className="fa-solid fa-magnifying-glass"></i>Search
              </button>
            </div>
          </div>

          <AnimatePresence>
            {searchInp && (
              <motion.div
                className={`search-box ${searchInp ? "entering" : ""}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <button className="btn-search">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
                <input
                  placeholder="Search"
                  type="search"
                  name="search"
                  id="search"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {productContent}
      </section>
    </div>
  );
};

export default Main;
