import { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { useNavigate, Link } from "react-router-dom";

//redux
import { useDispatch } from "react-redux";
import { userLogin } from "../slices/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(userLogin({ email, password }));

    setEmail("");
    setPassword("");
    navigate("/list");
  };

  return (
    <Container style={{ maxWidth: "500px" }}>
      <Card>
        <Card.Header>
          LOGIN -{" "}
          <span style={{ fontSize: "12px", float: "right" }}>
            User example to test (demo@demo.com/123456)
          </span>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={email}
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={password}
                placeholder=""
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button type="submit">Submit</Button>

            <Link
              to="/register"
              style={{ textDecoration: "none", color: "#666", float: "right" }}
            >
              Don't have an account? Sign Up
            </Link>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
