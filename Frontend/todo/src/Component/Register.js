import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom'
import { userRegister } from "../Actions/RegisterActions";
import { useDispatch, useSelector } from "react-redux";
import  Message from './Message'
import Loading from "./Loading";
import FormContainer from "./FormContainer";

function Register({history,location}) {
  const [register, setRegister] = useState({});
  const [customMsg, setCustomMsg] = useState("");

  const dispatch = useDispatch();
  const initState = useSelector((state) => state);
  const { errorRegister, loading } = initState;

  useEffect(() => {
    dispatch({
      type: "ERROR_REFRESH",
    });
  }, [dispatch]);

  const handelChange = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    if (register.password === register.confirmPassword){
      setCustomMsg(null)
      dispatch(userRegister(register, history));
    }else{
      setCustomMsg("Passwords dont match")
    }  
  };
  return (
    <FormContainer>
      {loading && <Loading />}
      <Form className="form my-5" onSubmit={handelSubmit}>
        <h1 className="text-center" style={{ fontFamily: "serif" }}>
          Register
        </h1>
        {errorRegister && errorRegister.email && (
          <Message variant="danger">{errorRegister.email[0]}</Message>
        )}

        {errorRegister && errorRegister.username && (
          <Message variant="danger">{errorRegister.username[0]}</Message>
        )}

        {errorRegister && errorRegister.password && (
          <Message variant="danger">
            {"Ensure password field has at least 6 characters."}
          </Message>
        )}
        {customMsg && <Message variant="danger">{customMsg}</Message>}
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
    </FormContainer>
  );
}

export default Register;
