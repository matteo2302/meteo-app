import 'bootstrap/dist/css/bootstrap.min.css';
import { useReducer, useState, useEffect } from 'react';
import Meteoinfo from './MeteoInfo';
import FormMeteo from './FormMeteo';
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
  //effettuo la chiamata api per ottenere i dati del meteo
  useEffect(() => {
    if (coordinate.latitude && coordinate.longitude) {
      const fetchMeteo = async () => {
        dispatch({ type: "LOADING" });
        try {
          let resMeteo = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coordinate.latitude}&longitude=${coordinate.longitude}&current_weather=true`
          );
          let dataMeteo = await resMeteo.json();
          dispatch({
            type: "SUCCESS", payload: { ...dataMeteo.current_weather, nome: coordinate.nome }
          });
        } catch (err) {
          dispatch({ type: "ERROR", payload: "errore  nel caricamento dei dati" });
        }
      };

      fetchMeteo();
    }
  }, [coordinate]);



  //leggo l'ora del meteo e gestisco la classe dimanica applicata
  let ultimaCitta = state.meteo.length > 0 ? state.meteo[state.meteo.length - 1] : null;
  let ora = ultimaCitta ? new Date(ultimaCitta.time).getHours() : null;
  let classeOra = "";
  if (ora !== null) {
    classeOra = (ora >= 6 && ora < 18) ? "giorno" : "notte";
  }

  return (
    <div className={`App ${classeOra}`}>
      <h1 className='text-center'>Meteo</h1>
      <FormMeteo setCoordinate={setCoordinate} dispatch={dispatch} />
      {state.caricamento && <p className="text-center" >Caricamento...</p>}
      {state.errore && <p>{state.errore}</p>}
      <div className='d-flex'>
        {state.meteo.map((m, index) => (
          < Meteoinfo key={index} meteo={m} />))}
      </div>

    </div>
  );
}

export default App;
