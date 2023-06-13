import { useState } from "react";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

//redux
import { resetMessageUser, userLogout } from "../slices/userSlice";
import { resetMessageTodo } from "../slices/todoSlice";
import { useDispatch, useSelector } from "react-redux";

function NavBar() {
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //control show or hide offcanvas
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = () => {
    dispatch(resetMessageUser());
    dispatch(resetMessageTodo());

    dispatch(userLogout());

    localStorage.clear();
    navigate("/");
  };

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
        <Navbar.Brand href="/">React Redux ToDo</Navbar.Brand>
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
              <Nav.Link as={NavLink} to="/">
                <Button>Home</Button>
              </Nav.Link>
              <Nav.Link as={NavLink} to="/list">
                <Button>List</Button>
              </Nav.Link>
              <Nav.Link as={NavLink} to="/add">
                <Button variant="success">Add</Button>
              </Nav.Link>
              {user ? (
                <Nav.Link as={NavLink} to="/">
                  <Button variant="danger" onClick={handleLogout}>
                    Logout ({user.user.name})
                  </Button>
                </Nav.Link>
              ) : null}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default NavBar;
