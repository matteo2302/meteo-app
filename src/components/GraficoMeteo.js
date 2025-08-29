import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

function GraficoMeteo({ dati }) {
    // dati sarà un array di oggetti { ora, temperatura }
    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dati}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ora" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="temperatura" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default GraficoMeteo;
