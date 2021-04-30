import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom'
import { userRegister } from "../Actions/RegisterActions";
import { useDispatch, useSelector } from "react-redux";
import  Message from './Message'

function Register({history,location}) {
  const [register, setRegister] = useState({});

  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);

  useEffect(() => {
    dispatch({
      type: "ERROR",
    });
  }, [dispatch]);

  const handelChange = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    dispatch(userRegister(register,history));
  };
  return (
    <div>
      <Header />
      <Form className="form my-5" onSubmit={handelSubmit}>
        <h1 className="text-center" style={{ fontFamily: "serif" }}>
          Register
        </h1>
        {error && <Message variant="danger">{error}</Message>}
        <Form.Group controlId="Username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="Username"
            name="username"
            placeholder="Enter username"
            value={register.username}
            required
            onChange={handelChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={register.email}
            required
            onChange={handelChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            value={register.password}
            required
            onChange={handelChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            placeholder="Password"
            value={register.confirmPassword}
            required
            onChange={handelChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Register
        </Button>
        <Row className="py-3">
          <Col>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "blue" }}>
              Sign In
            </Link>
          </Col>
        </Row>
      </Form>
      <Footer />
    </div>
  );
}

export default Register;
