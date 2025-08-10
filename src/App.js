import { useState, useEffect } from 'react';
import Meteoinfo from './MeteoInfo';
import FormMeteo from './FormMeteo';
import './App.css';




function App() {
  let [meteo, setMeteo] = useState(null);
  let [caricamento, setCaricamento] = useState(true);
  let [errore, setErrore] = useState(null);
  let [coordinate, setCoordinate] = useState({ latitude: null, longitude: null });

  //effettuo la chiamata api per ottenere i dati del meteo
  useEffect(() => {
    if (coordinate.latitude && coordinate.longitude) {
      const fetchMeteo = async () => {
        try {
          let resMeteo = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coordinate.latitude}&longitude=${coordinate.longitude}&current_weather=true`);
          let dataMeteo = await resMeteo.json();
          setMeteo(dataMeteo.current_weather);
          setCaricamento(false);
        } catch (err) {
          setErrore("errore nel caricamento dei dati");
          setCaricamento(false);
        }
      };

      fetchMeteo();
    }
  }, [coordinate]);



  //leggo l'ora del meteo e gestisco la classe dimanica applicata

  let ora = meteo ? new Date(meteo.time).getHours() : null;
  let classeOra = "";
  if (ora !== null) {
    classeOra = (ora >= 6 && ora < 18) ? "giorno" : "notte";
  }

  return (
    <div className={`App ${classeOra ? " " + classeOra : ""}`}>
      <h1>Meteo</h1>
      <FormMeteo setCoordinate={setCoordinate} setCaricamento={setCaricamento} setErrore={setErrore} />
      {caricamento && <p>Caricamento...</p>}
      {errore && <p>{errore}</p>}
      {meteo && <Meteoinfo meteo={meteo} />}


    </div>
  );
}

export default App;
