import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../muii/Loader";
import { MdAddShoppingCart } from "react-icons/md";
import { addFavoriteProduct } from "../Redux/Slice/favouriteSlice";
import { addToCartProducts, increment } from "../Redux/Slice/addToCart";
import { Link } from "react-router-dom";

const CategoryProduct = () => {
  const status = useSelector((state) => state.product.status);
  const filteredProduct = useSelector((state) => state.product.filteredProduct);
  const dispatch = useDispatch();

  const handleAddFavoriteProduct = (product) => {
    dispatch(addFavoriteProduct(product));
  };
  const handleAddToCart = (product) => {
    dispatch(addToCartProducts(product));
    dispatch(increment());
  };

  return (
    <div className="products">
      <div className="row-product">
        {status === "loading" ? (
          <Loader />
        ) : (
          filteredProduct.map((item) => (
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
                    <Link to="productdetail" className="product-title">
                      {item.title}
                    </Link>
                    <p className="price">$ {item.price}</p>
                  </div>
                  <div className="icon">
                    <i
                      onClick={() => handleAddFavoriteProduct(item)}
                      className="fa-regular fa-heart"
                    ></i>
                    <MdAddShoppingCart
                      className="basket"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleAddToCart(item)}
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

export default React.memo(CategoryProduct);