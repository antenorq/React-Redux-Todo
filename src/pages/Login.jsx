import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

const Login = () => {
  return (
    <Container style={{ maxWidth: "500px" }}>
      <Card>
        <Card.Header>LOGIN</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Button variant="primary">Submit</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
