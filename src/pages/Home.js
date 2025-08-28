import React from 'react';
import Meteoinfo from '../MeteoInfo';
import FormMeteo from '../FormMeteo';
import PreferMeteo from '../PreferMeteo';
import CardMeteo from "../components/Card";




export default function Home({ meteo, caricamento, errore, setCoordinate, aggiungiPreferito, preferiti, rimuoviPreferito, classeOra }) {
    if (caricamento) return <p>Caricamento...</p>;
    if (errore) return <p>Errore: {errore}</p>;

    return (
        <div className="App">
            <h1 className='text-center'>Meteo</h1>
            <FormMeteo setCoordinate={setCoordinate} />
            {caricamento && <p className="text-center" >Caricamento...</p>}
            {errore && <p>{errore}</p>}
            <div className='d-flex'>

                {meteo && (
                    <Meteoinfo meteo={meteo} aggiungiPreferito={aggiungiPreferito} />
                )}
            </div>
            <h2>Risultati ricerca</h2>
            {meteo && meteo.length > 0 ? (
                meteo.map((c, i) => (
                    <CardMeteo
                        key={i}
                        citta={c}
                        onAggiungi={aggiungiPreferito}
                        onRimuovi={rimuoviPreferito}
                        isPreferito={preferiti.some(p => p.nome === c.nome)}
                    />
                ))
            ) : (
                <p>Nessun dato meteo disponibile</p>
            )}
            <PreferMeteo preferiti={preferiti}
                onSeleziona={(c) => setCoordinate(c)}
                onRimuovi={rimuoviPreferito} /></div>
    );
}




