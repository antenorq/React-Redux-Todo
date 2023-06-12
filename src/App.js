import { BrowserRouter, Routes, Route } from "react-router-dom";

//Booststrap 5
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";

//Components
import NavBar from "./components/NavBar";
// import Footer from "./components/Footer";
import Login from "./pages/Login";
import TodoList from "./pages/TodoList";
import AddTodo from "./pages/AddTodo";
import EditTodo from "./pages/EditTodo";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Container>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/list" element={<TodoList />} />
          <Route path="/add" element={<AddTodo />} />
          <Route path="/edit/:id" element={<EditTodo />} />
        </Routes>
      </Container>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
