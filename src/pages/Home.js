import React from 'react';
import FormMeteo from '../FormMeteo';
import PreferMeteo from '../PreferMeteo';
import CardMeteo from "../components/CardMeteo";

export default function Home({ meteo, caricamento, errore, setCoordinate, aggiungiPreferito, preferiti, rimuoviPreferito }) {
    return (
        <div className="App">
            <h1 className='text-center'>Meteo</h1>
            <FormMeteo setCoordinate={setCoordinate} />
            {caricamento && <p className="text-center">Caricamento...</p>}
            {errore && <p>{errore}</p>}

            <h2>Risultati ricerca</h2>
            {meteo ? (
                <CardMeteo
                    citta={meteo}
                    onAggiungi={aggiungiPreferito}
                    onRimuovi={rimuoviPreferito}
                    isPreferito={preferiti.some(p => p.nome === meteo.nome)}
                />
            ) : (
                <p>Nessun dato meteo disponibile</p>
            )}

            <PreferMeteo
                preferiti={preferiti}
                onSeleziona={(c) => setCoordinate(c)}
                onRimuovi={rimuoviPreferito}
            />
        </div>
    );
}
