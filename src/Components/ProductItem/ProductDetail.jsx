import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FaPlus, FaMinus } from "react-icons/fa6";
import {
  addToCartProductDetail,
  addToCartProducts,
  decrementCounter,
  incrementCounter,
} from "../Redux/Slice/addToCart";

const ProductDetail = () => {
  const { title } = useParams();
  let counter = useSelector((state) => state.addToCartProduct.counter);

  const handleCountIncrement = () => {
    dispatch(incrementCounter());
  };

  const handleCountDecrement = () => {
    dispatch(decrementCounter());
  };

  const handleInputChange = (e) => {
    setCountProduct(Number(e.target.value));
  };

  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    dispatch(addToCartProductDetail(product));
  };

  const products = useSelector((state) => state.product.product);
  let selectedProduct = products.find((item) => item.title === title);

  if (!selectedProduct) {
    selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));
  }

  useEffect(() => {
    if (!selectedProduct) {
      console.error("Product not found");
    } else {
      localStorage.setItem("selectedProduct", JSON.stringify(selectedProduct));
    }
  }, [selectedProduct]);

  if (!selectedProduct) {
    return <div>Product details not found</div>;
  }

  const { image, price, description, category } = selectedProduct;

  return (
    <div className="detail-container">
      <div className="product-detail">
        <div className="info">
          <p style={{ textTransform: "capitalize" }}>
            Home {">"} {category} {">"} {title}
          </p>
        </div>
        <div className="product-info">
          <div className="product">
            <div className="card-img">
              <img src={image} alt={title} />
            </div>

            <div className="details">
              <div className="product-details">
                <h2>{title}</h2>
                <p style={{ textTransform: "capitalize" }}>{description}</p>
                <p className="price-product">{price}$</p>
              </div>
              <div className="product-cart">
                <div className="wrap-num-product">
                  <div
                    onClick={handleCountDecrement}
                    className="btn-num-product-down"
                  >
                    <FaMinus style={{ cursor: "pointer" }} />
                  </div>
                  <input
                    onChange={handleInputChange}
                    className="num-product"
                    type="number"
                    name="num-product"
                    value={counter}
                  ></input>
                  <div
                    onClick={handleCountIncrement}
                    className="btn-num-product-up "
                  >
                    <FaPlus style={{ cursor: "pointer" }} />
                  </div>
                </div>
                <div className="btn">
                  <button onClick={() => handleAddToCart(selectedProduct)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
