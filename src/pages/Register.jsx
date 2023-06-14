import { useState } from "react";
import { useNavigate } from "react-router-dom";

//bootstrap
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

//redux
import { useDispatch } from "react-redux";
import { userRegister } from "../slices/userSlice";

const Register = () => {
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(userRegister({ name, login, email, password }));

    setName("");
    setLogin("");
    setEmail("");
    setPassword("");
    navigate("/list");
  };

  return (
    <Container style={{ maxWidth: "500px" }}>
      <Card>
        <Card.Header>REGISTER</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                value={name}
                placeholder="Enter name"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Login</Form.Label>
              <Form.Control
                name="login"
                value={login}
                placeholder="Enter login"
                onChange={(e) => setLogin(e.target.value)}
              />
            </Form.Group>

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
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;
