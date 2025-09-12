import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from "./pages/Home";
import Preferiti from "./pages/Preferiti";
import DettagliMeteo from './pages/DettagliMeteo';
import useMeteo from './hooks/useMeteo';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import UsePreferiti from './hooks/UsePreferiti';
import UseGeolocalizzazione from './hooks/UseGeolocalizzazione';
import 'leaflet/dist/leaflet.css';
import './App.css';

function App() {
  const [coordinate, setCoordinate] = useState({ latitude: null, longitude: null, nome: "" });
  const { meteo, caricamento, errore } = useMeteo(coordinate);
  let [tema, setTema] = useState("light");
  function toggleTema() {
    setTema(prev => (prev === "light" ? "dark" : "light"));
  }

  const { preferiti, aggiungiPreferito, rimuoviPreferito, isPreferito } = UsePreferiti();
  useEffect(() => {
    UseGeolocalizzazione(setCoordinate);
  }, []);
  return (
    <Router>
      <div className={`App ${tema}`}>
        <Navbar bg="dark" data-bs-theme="dark" expand="lg">
          <Container>
            <Navbar.Brand href="#">🌤️ MeteoApp</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/preferiti">Preferiti</Nav.Link>
              </Nav>
              <Button variant="secondary" onClick={toggleTema}>
                Cambia tema
              </Button>
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
                coordinate={coordinate}
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
      </div>
    </Router>
  );
}

export default App;
