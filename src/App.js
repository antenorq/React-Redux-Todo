import { BrowserRouter, Routes, Route } from "react-router-dom";

//Booststrap 5
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";

//Components
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Container>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </Container>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
