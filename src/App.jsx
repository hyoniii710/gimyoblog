import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

import Home from "./pages/Home";
import Introduce from "./pages/Introduce";
import Schedule from "./pages/Schedule";
import Note from "./pages/Note";
import data from "./data";
import { createContext, useState } from "react";
import Cart from "./pages/Cart";

export const AppContext = createContext(); // context 생성

function App() {
  let shoes = data;
  const [stock] = useState([10, 11, 12]); // 전역 상태

  return (
    <Router>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            GIMYO BLOG.
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/introduce/1">
              {/* <Nav.Link as={Link} to="/introduce/0"> */}
              Introduce
            </Nav.Link>
            <Nav.Link as={Link} to="/schedule">
              이벤트
            </Nav.Link>
            <Nav.Link as={Link} to="/note">
              Note
            </Nav.Link>
            <Nav.Link as={Link} to="/cart">
              장바구니
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <AppContext.Provider value={{ stock, shoes }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/introduce/:id" element={<Introduce />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/note" element={<Note />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </AppContext.Provider>
    </Router>
  );
}

export default App;
