import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from "./pages/Home";
import Preferiti from "./pages/Preferiti";
import DettagliMeteo from './pages/DettagliMeteo';
import useMeteo from './hooks/useMeteo';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './App.css';

function App() {
  const [coordinate, setCoordinate] = useState({ latitude: null, longitude: null, nome: "" });
  const [preferiti, setPreferiti] = useState(() => {
    const saved = localStorage.getItem("preferiti");
    return saved ? JSON.parse(saved) : [];
  });

  const { meteo, caricamento, errore } = useMeteo(coordinate);

  const aggiungiPreferito = (citta) => {
    if (!preferiti.some(p => p.nome === citta.nome)) {
      const nuovaCitta = {
        ...citta,
        latitude: citta.latitude ?? citta.lat,
        longitude: citta.longitude ?? citta.lon
      };
      const nuoviPreferiti = [...preferiti, nuovaCitta];
      setPreferiti(nuoviPreferiti);
      localStorage.setItem("preferiti", JSON.stringify(nuoviPreferiti));
    }
  };

  const rimuoviPreferito = (nome) => {
    const nuoviPreferiti = preferiti.filter(c => c.nome !== nome);
    setPreferiti(nuoviPreferiti);
    localStorage.setItem("preferiti", JSON.stringify(nuoviPreferiti));
  };

  return (
    <Router>
      <Navbar bg="dark" data-bs-theme="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#">🌤️ MeteoApp</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/preferiti">Preferiti</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Routes>
          <Route path="/" element={
            <Home
              meteo={meteo}
              caricamento={caricamento}
              errore={errore}
              setCoordinate={setCoordinate}
              aggiungiPreferito={aggiungiPreferito}
              preferiti={preferiti}
              rimuoviPreferito={rimuoviPreferito}
            />
          } />
          <Route path="/preferiti" element={
            <Preferiti
              preferiti={preferiti}
              onSeleziona={(c) => setCoordinate(c)}
              onRimuovi={rimuoviPreferito}
            />
          } />
          <Route path="/DettagliMeteo/:nome" element={<DettagliMeteo />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
