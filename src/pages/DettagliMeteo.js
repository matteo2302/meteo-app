import React from 'react';
import { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import useMeteo from "../hooks/useMeteo";
import GraficoGenerico from "../components/GraficoGenerico";

function DettagliMeteo() {
    const { nome } = useParams();
    const [type, setType] = useState("temperature");
    const location = useLocation();
    const { latitude, longitude } = location.state || {};

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
            <div className="btn-group mb-3" role="group" aria-label="choose-chart">
                <button className={`btn ${type === "temperature" ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => setType("temperature")}>Temperatura</button>
                <button className={`btn ${type === "wind" ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => setType("wind")}>Vento</button>
                <button className={`btn ${type === "precipitation" ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => setType("precipitation")}>Precipitazioni</button>
            </div>
            <GraficoGenerico hourly={meteo.hourly} type={type} />

        </div>
    );
}

export default DettagliMeteo;
