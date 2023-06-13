import { useState } from "react";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";

function NavBar() {
  const user = useSelector((state) => state.user.user);

  //control show or hide offcanvas
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const expand = "md";
  return (
    <Navbar
      key={expand}
      bg="dark"
      variant="dark"
      className="mb-3"
      expand={expand}
    >
      <Container>
        <Navbar.Brand href="/">React TODO</Navbar.Brand>
        <Navbar.Toggle onClick={handleShow} />
        <Navbar.Offcanvas show={show} onHide={handleClose} placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>MENU</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav
              onClick={handleClose}
              className="justify-content-end flex-grow-1 pe-3"
            >
              {user ? (
                <Nav.Link as={NavLink} to="/">
                  {user.user.name}
                </Nav.Link>
              ) : null}

              <Nav.Link as={NavLink} to="/">
                <Button>Home</Button>
              </Nav.Link>
              <Nav.Link as={NavLink} to="/list">
                <Button data-bs-dismiss>List</Button>
              </Nav.Link>
              <Nav.Link as={NavLink} to="/add">
                <Button data-bs-dismiss>Add</Button>
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default NavBar;
