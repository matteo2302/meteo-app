import React from 'react';
import FormMeteo from '../FormMeteo';
import PreferMeteo from '../PreferMeteo';
import CardMeteo from "../components/CardMeteo";
import MappaMeteo from "../components/MappaMeteo";

export default function Home({ meteo,
    caricamento,
    errore,
    setCoordinate,
    aggiungiPreferito,
    preferiti,
    rimuoviPreferito,
    coordinate, ...props }) {
    return (
        <div className="App">
            <h1 className='text-center'>Meteo</h1>
            <FormMeteo setCoordinate={setCoordinate} />
            {caricamento && <p className="text-center">Caricamento...</p>}
            {errore && <p>{errore}</p>}


            <div className="d-flex justify-content-around">
                <div>
                    <h2>Seleziona sulla mappa</h2>
                    <div className='mappa-wrapper'>
                        <MappaMeteo onSelect={setCoordinate} coordinate={meteo ? coordinate : {}} />
                    </div>
                </div>
                <div className='d-flex flex-column align-items-center justify-content-center'>
                    <h2>Risultati ricerca</h2>
                    {meteo ? (
                        <CardMeteo
                            citta={meteo}
                            onAggiungi={aggiungiPreferito}
                            onRimuovi={rimuoviPreferito}
                            isPreferito={preferiti.some(p => p.nome === meteo.nome)}
                            loading={caricamento}
                        />
                    ) : (
                        <p>Nessun dato meteo disponibile</p>
                    )}
                </div>
            </div>

        </div>
    );
}
