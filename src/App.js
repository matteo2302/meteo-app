import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from "./pages/Home";
import { Navbar, Nav, Container } from 'react-bootstrap';
import Preferiti from "./pages/Preferiti";
import DettagliMeteo from './pages/DettagliMeteo';
import useMeteo from './hooks/useMeteo';
import './App.css';


function App() {

  let [coordinate, setCoordinate] = useState({ latitude: null, longitude: null, nome: "" });
  let [preferiti, setPreferiti] = useState(() => {
    let saved = localStorage.getItem("preferiti");
    return saved ? JSON.parse(saved) : [];
  });


  let { meteo, caricamento, errore } = useMeteo(coordinate);


  let aggiungiPreferito = (citta) => {
    if (!preferiti.some(p => p.nome === citta.nome)) {
      let nuoviPreferiti = [...preferiti, citta];
      setPreferiti(nuoviPreferiti);
      localStorage.setItem("preferiti", JSON.stringify(nuoviPreferiti));
    }
  };

  let rimuoviPreferito = (nome) => {
    let nuoviPreferiti = preferiti.filter(c => c.nome !== nome);
    setPreferiti(nuoviPreferiti);
    localStorage.setItem("preferiti", JSON.stringify(nuoviPreferiti));
  };

  return (
    <Router>
      <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">🌤️ MeteoApp</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/preferiti">preferiti</Nav.Link>
              <Nav.Link as={Link} to="/DettagliMeteo">dettagli</Nav.Link>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className='mt-4'>
        <Routes>
          <Route
            path="/"
            element={<Home
              meteo={meteo}
              caricamento={caricamento}
              errore={errore}
              setCoordinate={setCoordinate}


              aggiungiPreferito={aggiungiPreferito}
              preferiti={preferiti}
              rimuoviPreferito={rimuoviPreferito}
            />}
          />
          <Route
            path='/preferiti'
            element={
              <Preferiti
                preferiti={preferiti}
                onSeleziona={(c) => setCoordinate(c)}
                onRimuovi={rimuoviPreferito} />}
          />
          <Route
            path='/DettagliMeteo/:nome'
            element={
              <DettagliMeteo
              />}
          />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
