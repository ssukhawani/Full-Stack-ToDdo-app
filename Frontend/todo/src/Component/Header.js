import React from 'react'
import { Navbar, Nav } from "react-bootstrap";
import FaceIcon from "@material-ui/icons/Face";

function Header() {
    return (
      <div>
        <Navbar bg="primary" variant="dark" expand="lg">
          <Navbar.Brand href="/">Todo Keeper</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="auto">
              <Nav.Link href="/login">
                <i class="fas fa-sign-in-alt"></i> Login
              </Nav.Link>
            </Nav>
            <FaceIcon
              className="ml-auto"
              style={{ color: "white", fontSize: "40px", marginRight: "30px" }}
            />
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
}

export default Header
