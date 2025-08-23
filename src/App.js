import 'bootstrap/dist/css/bootstrap.min.css';
import { useReducer, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from "./pages/Home";
import { Navbar, Nav, Container } from 'react-bootstrap';
import Preferiti from "./pages/Preferiti";
import DettagliMeteo from './pages/DettagliMeteo';
import Meteoinfo from './MeteoInfo';
import FormMeteo from './FormMeteo';
import PreferMeteo from './PreferMeteo';
import './App.css';

//reducer function
function reducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return { ...state, caricamento: true, errore: null };
    case "SUCCESS":
      return { ...state, caricamento: false, meteo: [...state.meteo, action.payload] };
    case "ERROR":
      return { ...state, caricamento: false, errore: action.payload }
  }

}
function App() {
  let initialState = {
    meteo: [],
    caricamento: false,
    errore: null,
  };
  let [coordinate, setCoordinate] = useState({ latitude: null, longitude: null, nome: "" });
  let [state, dispatch] = useReducer(reducer, initialState);
  let [preferiti, setPreferiti] = useState(() => {
    let saved = localStorage.getItem("preferiti");
    return saved ? JSON.parse(saved) : [];
  });
  //effettuo la chiamata api per ottenere i dati del meteo
  useEffect(() => {
    if (coordinate.latitude && coordinate.longitude) {
      const fetchMeteo = async () => {
        dispatch({ type: "LOADING" });
        try {
          let meteoPromise = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coordinate.latitude}&longitude=${coordinate.longitude}&current_weather=true`)
            .then(res => res.json());
          let imagePromise = await fetch(`https://api.unsplash.com/search/photos?query=${coordinate.nome}&client_id=9zAzArCOCHTpXyhjUSraVs9690aUNICS6oK4DYnWNMw`)
            .then(res => res.json());
          let [dataMeteo, dataImage] = await Promise.all([meteoPromise, imagePromise]);
          let imageUrl = dataImage.results.length > 0 ? dataImage.results[0].urls.small : null
          dispatch({
            type: "SUCCESS", payload: {
              ...dataMeteo.current_weather, nome: coordinate.nome, image: imageUrl, latitude: coordinate.latitude,
              longitude: coordinate.longitude
            }
          });
        } catch (err) {
          dispatch({ type: "ERROR", payload: "errore  nel caricamento dei dati" });
        }
      };

      fetchMeteo();
    }
  }, [coordinate]);

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
  //leggo l'ora del meteo e gestisco la classe dimanica applicata
  let ultimaCitta = state.meteo.length > 0 ? state.meteo[state.meteo.length - 1] : null;
  let ora = ultimaCitta ? new Date(ultimaCitta.time).getHours() : null;
  let classeOra = "";
  if (ora !== null) {
    classeOra = (ora >= 6 && ora < 18) ? "giorno" : "notte";
  }

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
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className='mt-4'>
        <Routes>
          <Route
            path="/"
            element={<Home
              meteo={state.meteo}
              caricamento={state.caricamento}
              errore={state.errore}
              setCoordinate={setCoordinate}
              dispatch={dispatch}
              state={state}
              aggiungiPreferito={aggiungiPreferito}
              preferiti={preferiti}
              rimuoviPreferito={rimuoviPreferito}
              classeOra={classeOra} />}
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
                meteo={state.meteo}


              />}
          />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
