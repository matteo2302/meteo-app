import React from 'react';
import { useParams } from 'react-router-dom';
import useMeteo from "../hooks/useMeteo";

function DettagliMeteo() {
    let { nome } = useParams();
    const { meteo, caricamento, errore } = useMeteo(nome);

    if (caricamento) return <p>Caricamento...</p>;
    if (errore) return <p>Errore: {errore}</p>;
    if (!meteo) return <p>Nessun dato disponibile</p>;
    return (
        <div>
            <h2>dettaglio meteo di {meteo.nome}</h2>
            <p>🌡️ Temperatura: {meteo.temperature}°C</p>
            <p>💨 Vento: {meteo.windspeed} km/h</p>
            <p>📍 Ora rilevamento: {meteo.time}</p>
        </div>
    );
}



export default DettagliMeteo;