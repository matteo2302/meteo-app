import { useState, useEffect } from 'react';
import Meteoinfo from './MeteoInfo';
import FormMeteo from './FormMeteo';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  let [meteo, setMeteo] = useState([]);
  let [caricamento, setCaricamento] = useState(null);
  let [errore, setErrore] = useState(null);
  let [coordinate, setCoordinate] = useState({ latitude: null, longitude: null, nome: "" });

  //effettuo la chiamata api per ottenere i dati del meteo
  useEffect(() => {
    if (coordinate.latitude && coordinate.longitude) {
      const fetchMeteo = async () => {
        setCaricamento(true);
        try {
          let resMeteo = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coordinate.latitude}&longitude=${coordinate.longitude}&current_weather=true`);
          let dataMeteo = await resMeteo.json();
          setCaricamento(false);
          setMeteo(prev => [...prev, { ...dataMeteo.current_weather, nome: coordinate.nome }]);
        } catch (err) {
          setErrore("errore nel caricamento dei dati");
          setCaricamento(false);
        }
      };

      fetchMeteo();
    }
  }, [coordinate]);



  //leggo l'ora del meteo e gestisco la classe dimanica applicata
  let ultimaCitta = meteo.length > 0 ? meteo[meteo.length - 1] : null;
  let ora = ultimaCitta ? new Date(ultimaCitta.time).getHours() : null;
  let classeOra = "";
  if (ora !== null) {
    classeOra = (ora >= 6 && ora < 18) ? "giorno" : "notte";
  }

  return (
    <div className={`App ${classeOra}`}>
      <h1 className='text-center'>Meteo</h1>
      <FormMeteo setCoordinate={setCoordinate} setCaricamento={setCaricamento} setErrore={setErrore} />
      {caricamento && <p className="text-center" >Caricamento...</p>}
      {errore && <p>{errore}</p>}
      <div className='d-flex'>
        {meteo.map((m, index) => (
          < Meteoinfo key={index} meteo={m} />))}
      </div>

    </div>
  );
}

export default App;
