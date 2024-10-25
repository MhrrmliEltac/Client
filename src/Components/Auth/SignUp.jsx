import React, { useCallback, useState, useEffect } from "react";
import "../Auth/style.css";
import { Col, Container, Form, Row } from "react-bootstrap";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { getSignUpUser, resetStatus } from "../Redux/Slice/userSlice";
import toast from "react-hot-toast";
import { FaInfo } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { memo } from "react";

const selectUserStatus = createSelector(
  (state) => state.users,
  (users) => ({
    status: users.status,
    message: users.message,
    user: users.user,
  })
);

const SignUp = () => {
  const state = useSelector(selectUserStatus);
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    currentPassword: "",
  });

  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (
        formData.email &&
        formData.password &&
        formData.fullName &&
        formData.currentPassword &&
        phoneNumber
      ) {
        dispatch(getSignUpUser({ ...formData, phoneNumber }));
        localStorage.setItem("user", JSON.stringify(state.user));
        setTimeout(() => {
          navigate("/signin");
        }, 2500);
      } else {
        toast(
          <span
            className="flex items-center gap-2"
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <FaInfo style={{ marginRight: "8px", color: "#004085" }} />
            Please fill in all fields
          </span>
        );
      }
    },
    [dispatch, phoneNumber, formData]
  );

  useEffect(() => {
    if (state.status === "succeeded") {
      toast.success(state.user.message || "Success!");
      dispatch(resetStatus());
    } else if (state.status === "failed") {
      toast.error(state.message || "Failed!");
      dispatch(resetStatus());
    }
  }, [state.status, state.message]);

  return (
    <section
      className="login"
      style={{ marginTop: "100px", marginBottom: "30px" }}
    >
      <Container>
        <Row className="login-row justify-content-center">
          <Col xs={12} md={6} className="login-col">
            <Form className="login-form" onSubmit={handleSubmit}>
              <Form.Group className="flex flex-col login-box">
                <Form.Label className="login-label">Full Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter full name"
                  className="login-input"
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group
                controlId="formBasicEmail"
                className="flex flex-col login-box"
              >
                <Form.Label className="login-label">Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  className="login-input"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group
                controlId="formBasicEmail1"
                className="flex flex-col login-box"
              >
                <Form.Label className="login-label">Password</Form.Label>
                <Form.Control
                  className="login-input"
                  type="password"
                  autoComplete="on"
                  placeholder="Enter password"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group
                controlId="formBasicEmail2"
                className="flex flex-col login-box"
              >
                <Form.Label className="login-label">Password Again</Form.Label>
                <Form.Control
                  className="login-input"
                  type="password"
                  autoComplete="on"
                  placeholder="Enter password again"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      currentPassword: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group
                controlId="formBasicEmail"
                className="flex flex-col login-box"
              >
                <Form.Label className="login-label">Phone Number</Form.Label>
                <PhoneInput
                  className="flex login-input"
                  international
                  defaultCountry="AZ"
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                />
              </Form.Group>
              <Form.Group className="d-grid">
                <button className="btn-secondary login-btn">Sign Up</button>
              </Form.Group>
            </Form>
            <div className="validate">
              <p
                className={
                  formData.fullName.length < 3 ? "validate-text" : "green"
                }
              >
                <span style={{ color: "red" }}>*</span>Full Name must be at
                least 3 characters
              </p>
              <p
                className={
                  formData.password.length < 8 ? "validate-text" : "green"
                }
              >
                <span style={{ color: "red" }}>*</span>Password must be at least
                8 characters
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default memo(SignUp);
