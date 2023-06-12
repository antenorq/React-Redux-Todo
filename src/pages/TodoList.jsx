import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodos, deleteTodo } from "../slices/todoSlice";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.items);
  const loading = useSelector((state) => state.todos.loading);
  const error = useSelector((state) => state.todos.error);
  const success = useSelector((state) => state.todos.success);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div>
      {loading ? "LOADING" : ""}
      {error ? "ERROR: " + error : ""}
      {success ? "SUCCESS: " + success : ""}

      <Button variant="success" size="sm" onClick={() => navigate("/add")}>
        ADD TODO
      </Button>

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
    </div>
  );
};

export default TodoList;
