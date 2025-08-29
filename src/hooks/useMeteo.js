import { useState, useEffect } from "react";

function useMeteo({ latitude, longitude, nomeCitta }) {
    let [meteo, setMeteo] = useState(null);
    let [caricamento, setCaricamento] = useState(true);
    let [errore, setErrore] = useState(null);

    useEffect(() => {

        let fetchMeteo = async () => {
            setCaricamento(true);
            setErrore(null);
            try {
                let lat = latitude;
                let lon = longitude;
                let cityName = nomeCitta;
                if ((!lat || !lon) && nomeCitta) {
                    let res = await fetch(
                        `https://geocoding-api.open-meteo.com/v1/search?name=${nomeCitta}`
                    );
                    const geoData = await res.json();
                    if (!geoData.results || geoData.results.length === 0) {
                        throw new Error("Città non trovata");
                    }
                    lat = geoData.results[0].latitude;
                    lon = geoData.results[0].longitude;
                    cityName = geoData.results[0].name;
                }

                if (!lat || !lon) {
                    setCaricamento(false);
                    return;
                }

                let meteoPromise = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m&current_weather=true`
                ).then(res => res.json());
                let imagePromise = await fetch(`https://api.unsplash.com/search/photos?query=${nomeCitta}&client_id=9zAzArCOCHTpXyhjUSraVs9690aUNICS6oK4DYnWNMw`
                ).then(res => res.json());

                let [dataMeteo, dataImage] = await Promise.all([meteoPromise, imagePromise]);
                let imageUrl = dataImage.results.length > 0 ? dataImage.results[0].urls.small : null;


                setMeteo({
                    nome: cityName,
                    latitude: lat,
                    longitude: lon,
                    image: imageUrl,
                    temperature: dataMeteo.current_weather.temperature,
                    windspeed: dataMeteo.current_weather.windspeed,
                    current: dataMeteo.current_weather,
                    hourly: dataMeteo.hourly
                });



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
