import { useState, useEffect } from "react";

function useMeteo({ latitude, longitude, nomeCitta }) {
    let [meteo, setMeteo] = useState(null);
    let [caricamento, setCaricamento] = useState(true);
    let [errore, setErrore] = useState(null);

    useEffect(() => {
        if (!nomeCitta || !longitude || !latitude) { setCaricamento(false); return; }

        let fetchMeteo = async () => {
            setCaricamento(true);
            setErrore(null);
            try {
                let meteoPromise = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
                ).then(res => res.json());
                let imagePromise = await fetch(`https://api.unsplash.com/search/photos?query=${nomeCitta}&client_id=9zAzArCOCHTpXyhjUSraVs9690aUNICS6oK4DYnWNMw`
                ).then(res => res.json());

                let [dataMeteo, dataImage] = await Promise.all([meteoPromise, imagePromise]);
                let imageUrl = dataImage.results.length > 0 ? dataImage.results[0].urls.small : null;


                setMeteo({ ...dataMeteo.current_weather, nomeCitta, latitude, longitude, image: imageUrl });
            } catch (err) {
                setErrore(err.message);
            } finally {
                setCaricamento(false);
            }
        };


        fetchMeteo();
    }, [latitude, longitude, nomeCitta]);

    return { meteo, caricamento, errore };
}

export default useMeteo;
