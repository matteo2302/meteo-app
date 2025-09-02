import { useReducer, useEffect } from "react";

function reducer(state, action) {
    switch (action.type) {
        case "LOADING":
            return { ...state, caricamento: true, errore: null };
        case "SUCCESS":
            return { ...state, caricamento: false, meteo: action.payload };
        case "ERROR":
            return { ...state, caricamento: false, errore: action.payload };
        default:
            return state;
    }
}

function useMeteo({ nome, latitude, longitude }) {
    const initialState = {
        meteo: { hourly: { time: [], temperature_2m: [] } },
        caricamento: false,
        errore: null,
    };
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if (!latitude || !longitude) return; // esci se coordinate non disponibili

        const fetchMeteo = async () => {
            dispatch({ type: "LOADING" });
            try {
                const meteoPromise = fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,windspeed_10m,precipitation`
                ).then(res => res.json());

                const imagePromise = fetch(
                    `https://api.unsplash.com/search/photos?query=${nome}&client_id=9zAzArCOCHTpXyhjUSraVs9690aUNICS6oK4DYnWNMw`
                ).then(res => res.json());

                const [dataMeteo, dataImage] = await Promise.all([meteoPromise, imagePromise]);
                const imageUrl = dataImage.results.length > 0 ? dataImage.results[0].urls.small : null;

                dispatch({
                    type: "SUCCESS",
                    payload: {
                        ...dataMeteo.current_weather,
                        hourly: dataMeteo.hourly,
                        nome,
                        image: imageUrl,
                        latitude,
                        longitude,
                    },
                });
            } catch (err) {
                dispatch({ type: "ERROR", payload: "Errore nel caricamento dei dati" });
            }
        };

        fetchMeteo();
    }, [nome, latitude, longitude]);

    return {
        meteo: state.meteo,
        caricamento: state.caricamento,
        errore: state.errore,
    };
}

export default useMeteo;
