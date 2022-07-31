import React, { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import AuthContext from "../contexts/AuthContext";
import { NavLink } from "react-router-dom";

function NavBar() {
  const { activeUser, onLogout } = useContext(AuthContext);
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Nav className="me-auto">
          {activeUser && (
            <>
              <Nav.Link to="/home" as={NavLink}>
                Home
              </Nav.Link>
            </>
          )}
        </Nav>
        <Nav className="me-auto">
          {activeUser && (
            <>
              <Nav.Link to="/game" as={NavLink}></Nav.Link>
            </>
          )}
        </Nav>
        <Nav className="me-auto">
          {activeUser && (
            <>
              <Nav.Link to="/play" as={NavLink}></Nav.Link>
            </>
          )}
        </Nav>
        <Nav className="ms-auto">
          {!activeUser && (
            <Nav.Link to="#" as={NavLink}>
              Welcome
            </Nav.Link>
          )}
          {activeUser && (
            <Nav.Link onClick={onLogout} to="#" as={NavLink}>
              Logout
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
