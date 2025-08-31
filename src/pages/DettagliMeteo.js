import React from 'react';
import { useParams } from 'react-router-dom';
import useMeteo from "../hooks/useMeteo";
import GraficoMeteo from "../components/GraficoMeteo";


function DettagliMeteo() {
    let { nome } = useParams();
    const { meteo, caricamento, errore } = useMeteo({ nome });

    if (caricamento) return <p>Caricamento...</p>;
    if (errore) return <p>Errore: {errore}</p>;
    if (!meteo) return <p>Nessun dato disponibile</p>;
    if (!meteo || !meteo.hourly || !meteo.hourly.time) {
        return <p>Dati non disponibili</p>;
    }
    let datiGrafico = meteo.hourly.time.slice(0, 24).map((ora, i) => ({
        ora: new Date(ora).getHours() + ":00",
        temperatura: meteo.hourly.temperature_2m[i]
    }));
    return (
        <div>
            <h2>dettaglio meteo di {meteo.nome}</h2>
            {meteo?.hourly?.time ? (
                meteo.hourly.time.slice(0, 24).map((t, i) => (
                    <div key={i}>
                        <p>📍 Ora rilevamento: </p>
                        <p>{meteo.hourly.temperature_2m[i]}°C</p>
                    </div>
                ))
            ) : (
                <p>Dati orari non disponibili</p>
            )}

            <p>🌡️ Temperatura: {meteo.temperature}°C</p>
            <p>💨 Vento: {meteo.windspeed} km/h</p>
            <GraficoMeteo dati={datiGrafico} />
        </div>
    );
}



export default DettagliMeteo;