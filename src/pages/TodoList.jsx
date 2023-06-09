import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodos, deleteTodo } from "../slices/todoSlice";
import { Button, Col, Container, Row, Table } from "react-bootstrap";

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.items);
  const loading = useSelector((state) => state.todos.loading);

  console.log(todos);
  console.log(loading);

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div>
      {loading ? "LOADING" : ""}
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


<thead>
  <tr>
    <th>ID</th>
    <th>To Do</th>
    <th>Status</th>
    <th>Actions</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>1</td>
    <td>Mark</td>
    <td>Otto</td>
    <td>@mdo</td>
  </tr>
  <tr>
    <td>2</td>
    <td>Jacob</td>
    <td>Thornton</td>
    <td>@fat</td>
  </tr>
  <tr>
    <td>3</td>
    <td colSpan={2}>Larry the Bird</td>
    <td>@twitter</td>
  </tr>
</tbody>
</Table>


      ))}
    </div>
  );
};

export default TodoList;
