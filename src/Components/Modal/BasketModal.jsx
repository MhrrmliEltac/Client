import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../Redux/Slice/addToCart";
import { Box, Modal, Typography } from "@mui/material";
import { MdDelete } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

const BasketModal = ({ open, onClose }) => {
  const [basket, setBasketOpen] = useState(false);
  const handleBasketClose = () => {
    setBasketOpen(false);
  };

  const dispatch = useDispatch();

  const addToCartProduct = useSelector(
    (state) => state.addToCartProduct.addToCartProduct
  );
  let totalAmount = addToCartProduct.reduce(
    (acc, item) => acc + item.totalPrice,
    0
  );

  const handleAddProductDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <Modal
      className="modal"
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modal-box">
        <Box className="modal-heading">
          <Typography id="modal-modal-title" variant="h6" component="h2">
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
  );
};

export default BasketModal;
