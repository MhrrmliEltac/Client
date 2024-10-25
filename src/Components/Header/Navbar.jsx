import React, { useCallback, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { Box, Modal, Typography } from "@mui/material";
import { MdDelete } from "react-icons/md";
import { deleteProduct } from "../Redux/Slice/addToCart";
import { deleteFavoriteProduct } from "../Redux/Slice/favouriteSlice";
import img from "../../../public/logo-01.png.png";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FaUser } from "react-icons/fa6";

const Navbar = () => {
  const navigate = useNavigate();
  const [basketOpen, setBasketOpen] = useState(false);
  const [favoriteOpen, setFavoriteOpen] = useState(false);
  const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);
  const [color, setColor] = useState("Home");
  const localStorageItem = localStorage.getItem("user");
  const user = JSON.parse(localStorageItem);
  const isLogged = user && user.isLogged;
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setMenuOpen(!isMenuOpen);
  };

  const signOut = () => {
    localStorage.removeItem("user");
    navigate("/");
    setMenuOpen(false);
  };

  const handleBurgerMenuToggle = () => {
    setBurgerMenuOpen(!burgerMenuOpen);
  };

  const handleBasketClose = useCallback(() => {
    setBasketOpen(false);
  }, []);

  const handleBasketOpen = useCallback(() => {
    setBasketOpen(true);
  }, []);

  const handleFavoriteClose = useCallback(() => {
    setFavoriteOpen(false);
  }, []);

  const handleFavoriteOpen = useCallback(() => {
    setFavoriteOpen(true);
  }, []);

  const dispatch = useDispatch();
  const addToCartProduct = useSelector(
    (state) => state.addToCartProduct.addToCartProduct
  );
  let count = useSelector((state) => state.addToCartProduct.value);
  let totalAmount = useMemo(
    () => addToCartProduct.reduce((acc, item) => acc + item.totalPrice, 0),
    [addToCartProduct]
  );
  const favoriteProduct = useSelector(
    (state) => state.favoriteProduct.favouriteProduct
  );

  const handleAddProductDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  const handleFavoriteProductDelete = (id) => {
    dispatch(deleteFavoriteProduct(id));
  };

  return (
    <div className="content">
      <nav className="navbar limiter-menu-desktop">
        <div className={`nav-left`}>
          <Link onClick={() => setColor("Home")} to="/" className="logo">
            <img src={img} alt="Logo" />
          </Link>
          <div className={`menu-list`}>
            <ul className="nav-list">
              <Link
                to="/"
                onClick={() => setColor("Home")}
                className={`navbar-item ${color === "Home" ? "color" : ""}`}
              >
                Home
              </Link>
              <Link
                to="/shop"
                onClick={() => setColor("Shop")}
                className={`navbar-item ${color === "Shop" ? "color" : ""}`}
              >
                Shop
              </Link>
              <li
                onClick={() => setColor("About")}
                className={`navbar-item ${color === "About" ? "color" : ""}`}
              >
                About
              </li>
              <Link
                to="/contact"
                onClick={() => setColor("Contact")}
                className={`navbar-item ${color === "Contact" ? "color" : ""}`}
              >
                Contact
              </Link>
            </ul>
          </div>
        </div>
        <div className={`nav-right`}>
          <ul className="icon-list">
            <li className="icon-item">
              <i className="fa-solid fa-magnifying-glass"></i>
            </li>
            <li className="icon-item count-item">
              <i
                onClick={handleBasketOpen}
                className="fa-solid basket fa-basket-shopping"
              ></i>
              <div className="count">
                <span>{count}</span>
              </div>
              <Modal
                className="modal"
                open={basketOpen}
                onClose={handleBasketClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box className="modal-box">
                  <Box className="modal-heading">
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      YOUR CART
                    </Typography>
                    <IoMdClose
                      style={{ cursor: "pointer", fontSize: "22px" }}
                      onClick={handleBasketClose}
                    />
                  </Box>
                  <Box className="product-modal scroll-1">
                    {addToCartProduct.map((item) => (
                      <Box
                        className="product-box"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                        key={item.id}
                      >
                        <Box
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Box>
                            <img
                              loading="lazy"
                              style={{ width: "50px", height: "50px" }}
                              src={item.image}
                              alt={item.title}
                            />
                          </Box>
                          <Box>
                            <p style={{ textAlign: "center" }}>{item.title}</p>
                            <p style={{ textAlign: "end" }}>
                              {item.quantity}x {item.price}$
                            </p>
                          </Box>
                          <Box className="icon-box">
                            <MdDelete
                              onClick={() => handleAddProductDelete(item.id)}
                              className="delete-icon"
                              style={{ fontSize: "20px" }}
                            />
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                  <Box style={{ display: "flex", justifyContent: "center" }}>
                    <p>Total Amount: {totalAmount}$</p>
                  </Box>
                </Box>
              </Modal>
            </li>
            <li className="icon-item">
              <i
                onClick={handleFavoriteOpen}
                className="fa-regular fa-heart"
              ></i>
              <Modal
                className="modal"
                open={favoriteOpen}
                onClose={handleFavoriteClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box className="modal-box">
                  <Box className="modal-heading">
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      YOUR FAVORITES
                    </Typography>
                    <IoMdClose
                      style={{ cursor: "pointer", fontSize: "22px" }}
                      onClick={handleFavoriteClose}
                    />
                  </Box>
                  <Box className="product-modal scroll-1">
                    {favoriteProduct.map((item) => (
                      <Box
                        className="product-box"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                        key={item.id}
                      >
                        <Box
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Box>
                            <img
                              loading="lazy"
                              style={{ width: "50px", height: "50px" }}
                              src={item.image}
                              alt={item.title}
                            />
                          </Box>
                          <Box style={{ display: "flex" }}>
                            <Box>
                              <p style={{ textAlign: "center" }}>
                                {item.title}
                              </p>
                              <p style={{ textAlign: "end" }}>{item.price}$</p>
                            </Box>
                            <Box className="icon-box">
                              <MdDelete
                                onClick={() =>
                                  handleFavoriteProductDelete(item.id)
                                }
                                className="delete-icon"
                                style={{ fontSize: "20px" }}
                              />
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Modal>
            </li>
            {isLogged ? (
              <>
                <div className="relative ml-3">
                  <div>
                    <button
                      type="button"
                      className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      id="user-menu-button"
                      aria-expanded="false"
                      aria-haspopup="true"
                      onClick={handleMenuOpen}
                    >
                      <span className="absolute -inset-1.5"></span>
                      <span className="sr-only">Open user menu</span>
                      <FaUser className="h-8 w-8 rounded-full" />
                    </button>
                  </div>
                  {isMenuOpen && (
                    <div
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                    >
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        id="user-menu-item-0"
                      >
                        Your Profile
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        id="user-menu-item-1"
                      >
                        Settings
                      </a>
                      <button
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        id="user-menu-item-2"
                        onClick={signOut}
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <li className="sign-in">
                  <button className="w-[150px] h-[50px] bg-black text-base font-semibold px-3 py-2 cursor-pointer flex items-center justify-center rounded-md text-white">
                    <Link to="/signin">Sign In</Link>
                  </button>
                </li>
                <li className="sign-up">
                  <button className="w-[150px] h-[50px] bg-white text-base font-semibold border-solid border-black border-2 px-3 py-2 cursor-pointer flex items-center justify-center rounded-md text-black">
                    <Link to="/signup">Sign Up</Link>
                  </button>
                </li>
              </>
            )}
          </ul>
          <div className="burger-menu">
            {burgerMenuOpen ? (
              <FontAwesomeIcon
                className="icon-font"
                onClick={handleBurgerMenuToggle}
                icon={faXmark}
              />
            ) : (
              <FontAwesomeIcon
                className="icon-font"
                onClick={handleBurgerMenuToggle}
                icon={faBars}
              />
            )}
          </div>
        </div>
      </nav>
      <div className={`menu-list-burger ${burgerMenuOpen ? "open" : ""}`}>
        <ul className="nav-list">
          <Link
            to="/"
            onClick={() => setColor("Home")}
            className={`navbar-item ${color === "Home" ? "color" : ""}`}
          >
            Home
          </Link>
          <Link
            to="/shop"
            onClick={() => setColor("Shop")}
            className={`navbar-item ${color === "Shop" ? "color" : ""}`}
          >
            Shop
          </Link>
          <Link
            onClick={() => setColor("About")}
            className={`navbar-item ${color === "About" ? "color" : ""}`}
          >
            About
          </Link>
          <Link
            to="/contact"
            onClick={() => setColor("Contact")}
            className={`navbar-item ${color === "Contact" ? "color" : ""}`}
          >
            Contact
          </Link>
          {isLogged && (
            <>
              <button className="w-[150px] h-[50px] bg-black text-base font-semibold px-3 py-2 cursor-pointer flex items-center justify-center rounded-md text-white">
                <Link to="/signin">Sign In</Link>
              </button>
              <button className="w-[150px] h-[50px] bg-white text-base font-semibold border-solid border-black border-2 px-3 py-2 cursor-pointer flex items-center justify-center rounded-md text-black mt-3">
                <Link to="/signup">Sign Up</Link>
              </button>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
