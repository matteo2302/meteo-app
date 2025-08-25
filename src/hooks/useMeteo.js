import { useState, useEffect } from "react";

function useMeteo(nomeCitta) {
    let [meteo, setMeteo] = useState(null);
    let [caricamento, setCaricamento] = useState(true);
    let [errore, setErrore] = useState(null);

    useEffect(() => {
        if (!nomeCitta) return;

        let fetchMeteo = async () => {
            setCaricamento(true);
            setErrore(null);
            try {
                let resGeo = await fetch(
                    `https://geocoding-api.open-meteo.com/v1/search?name=${nomeCitta}`
                );
                let dataGeo = await resGeo.json();

                if (!dataGeo.results || dataGeo.results.length === 0) {
                    throw new Error("Città non trovata");
                }

                let { latitude, longitude } = dataGeo.results[0];

                let resMeteo = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
                );
                let dataMeteo = await resMeteo.json();

                setMeteo({ ...dataMeteo.current_weather, nome: nomeCitta });
            } catch (err) {
                setErrore(err.message);
            } finally {
                setCaricamento(false);
            }
        };


        fetchMeteo();
    }, [nomeCitta]);

    return { meteo, caricamento, errore };
}

export default useMeteo;
