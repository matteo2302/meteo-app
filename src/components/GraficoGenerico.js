import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const mapTypeToKey = {
    temperature: { dataKey: "temperatura", label: "Temperatura (°C)" },
    wind: { dataKey: "vento", label: "Vento (km/h)" },
    precipitation: { dataKey: "pioggia", label: "Precipitazioni (mm)" }
};

function GraficoGenerico({ hourly, type = "temperature" }) {
    if (!hourly) return null;
    const dati = hourly.time.slice(0, 24).map((ora, i) => ({
        ora: new Date(ora).getHours() + ":00",
        temperatura: hourly.temperature_2m?.[i],
        vento: hourly.windspeed_10m?.[i],
        pioggia: hourly.precipitation?.[i]
    }));
    const meta = mapTypeToKey[type];
    return (
        <div style={{ width: "100%", height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dati}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="ora" />
                    <YAxis />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey={meta.dataKey}
                        stroke={type === "temperature" ? "#ff7300" : type === "wind" ? "#387af6" : "#00a86b"}
                        strokeWidth={2}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default GraficoGenerico;
