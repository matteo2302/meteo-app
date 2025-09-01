import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import useMeteo from "../hooks/useMeteo";
import GraficoMeteo from "../components/GraficoMeteo";

function DettagliMeteo() {
    const { nome } = useParams();
    const location = useLocation();
    const { latitude, longitude } = location.state || {};

    // ✅ Hook sempre chiamato
    const { meteo, caricamento, errore } = useMeteo({
        nome,
        latitude: latitude ?? null,
        longitude: longitude ?? null,
    });

    if (!latitude || !longitude) return <p>Coordinate non disponibili per questa città</p>;
    if (caricamento) return <p>Caricamento...</p>;
    if (errore) return <p>Errore: {errore}</p>;
    if (!meteo || !meteo.hourly || !meteo.hourly.time) return <p>Dati non disponibili</p>;

    const datiGrafico = meteo.hourly.time.slice(0, 24).map((ora, i) => ({
        ora: new Date(ora).getHours() + ":00",
        temperatura: meteo.hourly.temperature_2m[i],
    }));

    return (
        <div>
            <h2>Dettaglio meteo di {nome}</h2>
            <p>🌡️ Temperatura attuale: {meteo.temperature ?? "N/D"}°C</p>
            <p>💨 Vento: {meteo.windspeed ?? "N/D"} km/h</p>
            <GraficoMeteo dati={datiGrafico} />
        </div>
    );
}

export default DettagliMeteo;
