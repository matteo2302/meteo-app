import { type } from "@testing-library/user-event/dist/type";
import { useReducer, useEffect } from "react";
function reducer(state, action) {
    switch (action.type) {
        case "LOADING":
            return { ...state, caricamento: true, errore: null };
        case "SUCCESS":
            return { ...state, caricamento: false, meteo: action.payload };
        case "ERROR":
            return { ...state, caricamento: false, errore: action.payload };
        default: return state;
    }
}

function useMeteo(coordinate) {
    let initialState = {
        meteo: {
            hourly: { time: [], temperature_2m: [] }
        },
        caricamento: false,
        errore: null,
    }
    const [state, dispatch] = useReducer(reducer, initialState);


    useEffect(() => {
        if (coordinate.latitude && coordinate.longitude) {
            let fetchMeteo = async () => {
                dispatch({ type: "LOADING" });
                try {
                    let meteoPromise = await fetch(
                        `https://api.open-meteo.com/v1/forecast?latitude=${coordinate.latitude}&longitude=${coordinate.longitude}&current_weather=true&hourly=temperature_2m`
                    ).then(res => res.json());

                    let imagePromise = await fetch(
                        `https://api.unsplash.com/search/photos?query=${coordinate.nome}&client_id=9zAzArCOCHTpXyhjUSraVs9690aUNICS6oK4DYnWNMw`
                    ).then(res => res.json());

                    let [dataMeteo, dataImage] = await Promise.all([meteoPromise, imagePromise]);

                    let imageUrl = dataImage.results.length > 0 ? dataImage.results[0].urls.small : null;

                    dispatch({
                        type: "SUCCESS",
                        payload: {
                            ...dataMeteo.current_weather,
                            hourly: dataMeteo.hourly,
                            nome: coordinate.nome,
                            image: imageUrl,
                            latitude: coordinate.latitude,
                            longitude: coordinate.longitude,
                        },
                    });
                } catch (err) {
                    dispatch({ type: "ERROR", payload: "Errore nel caricamento dei dati" });
                }
            };

            fetchMeteo();
        }
    }, [coordinate]);

    return {
        meteo: state.meteo,
        caricamento: state.caricamento,
        errore: state.errore
    };
}


export default useMeteo;
