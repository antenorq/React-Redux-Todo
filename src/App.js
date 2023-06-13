import { BrowserRouter, Routes, Route } from "react-router-dom";

//Booststrap 5
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

//Components
import NavBar from "./components/NavBar";
// import Footer from "./components/Footer";
import Login from "./pages/Login";
import TodoList from "./pages/TodoList";
import AddTodo from "./pages/AddTodo";
import EditTodo from "./pages/EditTodo";

//redux
import { useSelector } from "react-redux";

function App() {
  //user slice
  const user = useSelector((state) => state.user.user);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);
  const success = useSelector((state) => state.user.success);

  //todo slice
  const loadingtodo = useSelector((state) => state.todos.loading);
  const errortodo = useSelector((state) => state.todos.error);
  const successtodo = useSelector((state) => state.todos.success);

  return (
    <BrowserRouter>
      <NavBar />
      <Container>
        {loading || loadingtodo ? "LOADING" : ""}
        {error || errortodo ? (
          <Alert variant="danger">
            {error} - {errortodo}
          </Alert>
        ) : null}
        {success || successtodo ? (
          <Alert variant="success">
            {success} - {successtodo}
          </Alert>
        ) : null}

        <Routes>
          <Route path="/" element={user ? <TodoList /> : <Login />} />
          <Route path="/list" element={user ? <TodoList /> : <Login />} />
          <Route path="/add" element={user ? <AddTodo /> : <Login />} />
          <Route path="/edit/:id" element={user ? <EditTodo /> : <Login />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
