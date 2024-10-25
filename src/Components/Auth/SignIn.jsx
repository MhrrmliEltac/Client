import React, { useEffect, useState, useCallback } from "react";
import { Col, Container, Row, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../Auth/style.css";
import { useDispatch, useSelector } from "react-redux";
import { getLoginUser, resetStatus } from "../Redux/Slice/userSlice";
import toast from "react-hot-toast";
import { createSelector } from "reselect";
import { memo } from "react";
import { FaInfo } from "react-icons/fa";

const selectUserStatus = createSelector(
  (state) => state.users,
  (users) => ({
    isLogged: users.isLogged,
    status: users.status,
    message: users.message,
    user: users.user,
  })
);

const Login = () => {
  const dispatch = useDispatch();
  const state = useSelector(selectUserStatus);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (formData.email && formData.password) {
        dispatch(getLoginUser(formData));
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
    [dispatch, formData]
  );

  useEffect(() => {
    if (state.status === "succeeded") {
      toast.success(state.user.message || "Success!");
      dispatch(resetStatus());
      localStorage.setItem(
        "user",
        JSON.stringify({
          fullName: state.user.user.fullName,
          isLogged: state.isLogged,
        })
      );
      navigate("/user-screen", { state: { formData } });
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
              <Form.Group controlId="formBasicEmail" className="flex flex-col">
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
                className="flex flex-col"
                style={{ marginTop: "10px", marginBottom: "10px" }}
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
              <Form.Group className="d-grid">
                <button className="btn-secondary login-btn" size="lg">
                  Sign In
                </button>
              </Form.Group>
              <Form.Group>
                <Form.Text
                  className="login-text"
                  style={{
                    marginTop: "5px",
                  }}
                >
                  Do you have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-red"
                    style={{
                      color: "red",
                      marginLeft: "3px",
                    }}
                  >
                    Sign Up
                  </Link>
                </Form.Text>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default memo(Login);
