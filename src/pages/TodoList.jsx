import { useEffect } from "react";
import { Button, Table, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getTodos, deleteTodo } from "../slices/todoSlice";

const TodoList = () => {
  const dispatch = useDispatch();

  const todos = useSelector((state) => state.todos.items);
  const user = useSelector((state) => state.user.user);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTodos(user.user.id));
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  return (
    <Card>
      <Card.Header>TODO LIST</Card.Header>
      <Card.Body>
        <Button variant="success" size="sm" onClick={() => navigate("/add")}>
          ADD TODO
        </Button>
        <br />
        <br />

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>To Do</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo, index) => (
              <tr key={index}>
                <td>{todo.id}</td>
                <td>{todo.title}</td>
                <td>{todo.completed ? "complete" : "incomplete"}</td>
                <td align="right">
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => navigate("/edit/" + todo.id)}
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(todo.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default TodoList;
