import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchDataCategory,
  fetchProductData,
} from "../Redux/Slice/productSlice";
import Loader from "../muii/Loader";
import { addFavoriteProduct } from "../Redux/Slice/favouriteSlice";
import { Link, useNavigate } from "react-router-dom";
import { MdAddShoppingCart } from "react-icons/md";
import { addToCartProducts, increment } from "../Redux/Slice/addToCart";

const Product = () => {
  const dispatch = useDispatch();

  const product = useSelector((state) => state.product.product);
  const status = useSelector((state) => state.product.status);

  const handleAddFavoriteProduct = (product) => {
    dispatch(addFavoriteProduct(product));
  };
  const handleAddToCart = (product) => {
    dispatch(addToCartProducts(product));
    dispatch(increment());
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProductData());
    }
    dispatch(fetchDataCategory());
  }, []);

  const navigate = useNavigate();

  const handleGoToItemTitle = (item) => {
    navigate(`/productdetail/${item.title}`, {
      state: { productItem: item },
    });
  };

  return (
    <div className="products">
      <div className="row-product">
        {status === "loading" ? (
          <Loader />
        ) : (
          product.map((item) => (
            <div className="col-product" key={item.id}>
              <div className="card-product">
                <div className="card-img">
                  <Link
                    onClick={() => {
                      handleGoToItemTitle(item);
                    }}
                    to={`/productdetail/${item.title}`}
                  >
                    <img src={item.image} alt={item.title} />
                  </Link>
                </div>
                <div className="info-img">
                  <div className="description">
                    <Link
                      onClick={() => {
                        handleGoToItemTitle(item);
                      }}
                      to={`/productdetail/${item.title}`}
                      className="product-title"
                    >
                      {item.title}
                    </Link>

                    <p className="price">$ {item.price}</p>
                  </div>
                  <div className="icon">
                    <i
                      onClick={() => {
                        handleAddFavoriteProduct(item);
                      }}
                      className="fa-regular fa-heart"
                    ></i>
                    <MdAddShoppingCart
                      className="basket"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        handleAddToCart(item);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default React.memo(Product);
