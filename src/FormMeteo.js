import { useState } from "react"

function FormMeteo({ setCoordinate }) {
    let [citta, setCitta] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (citta.trim() === "") return;
        try {
            let res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${citta}`);
            let data = await res.json();
            if (!data.results || data.results.length === 0) {
                throw new Error("Città non trovata");
            }
            let { latitude, longitude, name } = data.results[0];
            setCoordinate({ latitude, longitude, nome: name });

        } catch (err) {
            console.error("Errore:", err.message);
        }
    }
    return (
        <form className="text-center" onSubmit={handleSubmit}>
            <input onChange={(e) => setCitta(e.target.value)} value={citta} type="text" placeholder="inserire la città" />
            <button type='submit'>cerca</button>
        </form>
    )
}
export default FormMeteo;