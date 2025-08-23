import React from 'react';
import { useParams } from 'react-router-dom';

function DettagliMeteo({ meteo }) {
    let { nome } = useParams();
    let citta = meteo.find(m => m.nome === nome);
    if (!citta) return <p>nessun dettaglio disponibile per {nome}</p>
    return (
        <div>
            <h2>dettaglio meteo di {citta.nome}</h2>
            <p>🌡️ Temperatura: {citta.temperature}°C</p>
            <p>💨 Vento: {citta.windspeed} km/h</p>
            <p>📍 Ora rilevamento: {citta.time}</p>
        </div>
    );
}



export default DettagliMeteo;