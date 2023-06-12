import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function NavBar() {
  const user = useSelector((state) => state.user.user);

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
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${expand}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
              MENU
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              {user ? (
                <Nav.Link as={NavLink} to="/list">
                  {user.email}
                </Nav.Link>
              ) : null}

              <Nav.Link as={NavLink} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/list">
                List
              </Nav.Link>
              <Nav.Link as={NavLink} to="/add">
                Add
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default NavBar;
