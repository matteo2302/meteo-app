import React from 'react';
import Meteoinfo from '../MeteoInfo';
import FormMeteo from '../FormMeteo';
import PreferMeteo from '../PreferMeteo';



export default function Home({ meteo, caricamento, errore, setCoordinate, aggiungiPreferito, preferiti, rimuoviPreferito, classeOra }) {
    return (
        <div  >
            <h1 className='text-center'>Meteo</h1>
            <FormMeteo setCoordinate={setCoordinate} />
            {caricamento && <p className="text-center" >Caricamento...</p>}
            {errore && <p>{errore}</p>}
            <div className='d-flex'>

                {meteo && (
                    <Meteoinfo meteo={meteo} aggiungiPreferito={aggiungiPreferito} />
                )}
            </div>
            <PreferMeteo preferiti={preferiti}
                onSeleziona={(c) => setCoordinate(c)}
                onRimuovi={rimuoviPreferito} />
        </div >
    );
}