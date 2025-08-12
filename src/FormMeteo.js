import { useState } from "react"

function FormMeteo({ setCoordinate, setCaricamento, setErrore }) {
    let [citta, setCitta] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (citta.trim() === "") return;
        setCaricamento(true);
        try {
            let res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${citta}`);
            let data = await res.json();
            if (!data.results || data.results.length === 0) {
                throw new Error("Città non trovata");
            }
            let { latitude, longitude, name } = data.results[0];
            setCoordinate({ latitude, longitude, nome: name });

        } catch (err) {
            setErrore("Errore nel caricamento dei dati");
        } finally {
            setCaricamento(false);
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