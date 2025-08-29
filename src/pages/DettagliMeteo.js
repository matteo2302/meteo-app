import React from 'react';
import { useParams } from 'react-router-dom';
import useMeteo from "../hooks/useMeteo";
import GraficoMeteo from "../components/GraficoMeteo";


function DettagliMeteo() {
    let { nome } = useParams();
    const { meteo, caricamento, errore } = useMeteo({ nomeCitta: nome });

    if (caricamento) return <p>Caricamento...</p>;
    if (errore) return <p>Errore: {errore}</p>;
    if (!meteo) return <p>Nessun dato disponibile</p>;
    let datiGrafico = meteo.hourly.time.slice(0, 24).map((ora, i) => ({
        ora: new Date(ora).getHours() + ":00",
        temperatura: meteo.hourly.temperature_2m[i]
    }));
    return (
        <div>
            <h2>dettaglio meteo di {meteo.nomeCitta}</h2>
            <p>🌡️ Temperatura: {meteo.current.temperature}°C</p>
            <p>💨 Vento: {meteo.current.windspeed} km/h</p>
            <p>📍 Ora rilevamento: {meteo.current.time}</p>
            <GraficoMeteo dati={datiGrafico} />
        </div>
    );
}



export default DettagliMeteo;