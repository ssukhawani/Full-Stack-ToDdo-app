import React,{useState} from 'react'
import { Navbar, Nav } from "react-bootstrap";
import FaceIcon from "@material-ui/icons/Face";
import UserProfile from './UserProfile';
import { withRouter } from 'react-router';
import { useSelector} from 'react-redux'
// import { profileAction } from '../Actions/logoutActions';

function Header({history}) {

  const state = useSelector((state) => state);
   const [ onClickProfile, setOnClickProfile] = useState(false)
  const { userInfo, showProfile } = state

  const handelProfile=()=>{
    setOnClickProfile(!onClickProfile)
  }
    return (
      <div className="header">
        <Navbar bg="primary" variant="dark" expand="lg" className="header">
          <Navbar.Brand href="/">Todo Keeper</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="auto">
              {userInfo && JSON.stringify(userInfo) === "{}" ? (
                <Nav.Link href="/login">
                  <i class="fas fa-sign-in-alt"></i> Login
                </Nav.Link>
              ) : (
                <></>
              )}
            </Nav>
            {showProfile && (
              <FaceIcon
                className="ml-auto"
                style={{
                  color: "white",
                  fontSize: "40px",
                  marginRight: "30px",
                  cursor:"pointer"
                }}
                onClick={handelProfile}
              />
            )}
          </Navbar.Collapse>

          {userInfo && JSON.stringify(userInfo) !== "{}" ? (
            onClickProfile && (
              <UserProfile
                setOnclickProfile={setOnClickProfile}
                history={history}
                style={{ boxShadow: "0 5px 5px 5px rgba(250, 250, 250, 1)" }}
              />
            )
          ) : (
            <></>
          )}
        </Navbar>
      </div>
    );
}

export default withRouter(Header)
