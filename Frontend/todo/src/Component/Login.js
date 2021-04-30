import React,{useState, useEffect} from 'react'
import Footer from './Footer'
import Header from './Header'
import {Form, Button, Row, Col} from 'react-bootstrap'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { userlogin } from "../Actions/loginActions";
import Message from './Message';
// import axios from 'axios'

function Login({history, location}) {

    const [login, setLogin] = useState({});

    const dispatch = useDispatch()
    const error = useSelector(state=>state.error)

    useEffect(()=>{
      dispatch({
        type:"ERROR"
      })
    },[dispatch])


    const handelChange= (e)=>{
        setLogin({...login, [e.target.name]:e.target.value})
    }  
    
    const handelSubmit=(e)=>{
        e.preventDefault()
        dispatch(userlogin(login, history));
    }

    return (
      <div>
        <Header />

        <Form className="form my-5" onSubmit={handelSubmit}>
          <h1 className="text-center" style={{ fontFamily: "serif" }}>
            Login
          </h1>
          {error && <Message variant="danger">{error}</Message>}
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="Username"
              name="username"
              placeholder="Enter username"
              value={login.username}
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
              value={login.email}
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
              value={login.password}
              required
              onChange={handelChange}
            />
          </Form.Group>
          <div className="my-3">
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>

          <Row className="py-3">
            <Col>
              New User ?{" "}
              <Link to="/register" style={{ color: "blue" }}>
                Register
              </Link>
            </Col>
          </Row>
        </Form>
        <Footer />
      </div>
    );
}

export default Login
