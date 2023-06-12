import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, editTodo } from "../slices/todoSlice";
import { useNavigate } from "react-router-dom";

//Bootstrap
import { Container, Card, Form, Button } from "react-bootstrap";

const TodoForm = ({ type, id }) => {
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);

  const todos = useSelector((state) => state.todos.items);

  useEffect(() => {
    if (id) {
      const todo = todos.find((item) => item.id == id);
      setTitle(todo.title);
    }
  }, [id, todos]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (type === "ADD") {
      dispatch(addTodo({ user_id: 1, title: title.trim(), completed }));
    }
    if (type === "EDIT") {
      dispatch(editTodo({ user_id: 1, id, title: title.trim(), completed }));
    }

    setTitle("");
    setCompleted(false);
    navigate("/list");
  };

  return (
    <Container style={{ maxWidth: "500px" }}>
      <Card>
        <Card.Header>{type} TODO</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCompleted">
              <Form.Label>Completed</Form.Label>
              <Form.Control
                type="text "
                placeholder="Completed"
                value={completed}
                onChange={(e) => setCompleted(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TodoForm;
