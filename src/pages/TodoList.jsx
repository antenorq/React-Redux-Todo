import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodos, deleteTodo } from "../slices/todoSlice";
import { Button, Col, Container, Row } from "react-bootstrap";

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.items);

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div>
      {todos.map((todo, index) => (
        <Container key={index}>
          <Row>
            <Col style={{ border: "solid 1px #000" }}>{todo.title}</Col>
            <Col style={{ border: "solid 1px #000" }}>
              {todo.completed ? "complete" : "incomplete"}
            </Col>
            <Col style={{ border: "solid 1px #000" }}>
              <Button onClick={() => handleDelete(todo.id)}>Delete</Button>
            </Col>
          </Row>
        </Container>
      ))}
    </div>
  );
};

export default TodoList;
