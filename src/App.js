import { useState, useEffect } from 'react';   
import Meteoinfo from './MeteoInfo';  

import './App.css';

function App() {
let [meteo, setMeteo] = useState(null);
let [caricamento, setCaricamento] = useState(true);
let [errore,setErrore] =useState(null);
useEffect(()=>{
  const fecthMeteo = async () => {
  try {
    let res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=44.1&longitude=8.27&current_weather=true');
    let data = await res.json();
    setMeteo(data.current_weather);
    setCaricamento(false);
  }catch(err){
    setErrore("errore nel caricamento dei dati");
    setCaricamento(false);
  };
}
  fecthMeteo();
}, []);


  return (
    <div className="App">
      <h1>Meteo Loano</h1>
      {caricamento && <p>Caricamento...</p>}
      {errore && <p>{errore}</p>}
      {meteo &&  <Meteoinfo meteo={meteo} />}

      
    </div>
  );
}

export default App;
