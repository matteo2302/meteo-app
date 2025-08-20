import React from 'react';
import Meteoinfo from '../MeteoInfo';
import FormMeteo from '../FormMeteo';
import PreferMeteo from '../PreferMeteo';



export default function Home({ meteo, caricamento, errore, setCoordinate, dispatch, state, aggiungiPreferito, preferiti, rimuoviPreferito, classeOra }) {
    return (
        <div className={`App ${classeOra}`}>
            <h1 className='text-center'>Meteo</h1>
            <FormMeteo setCoordinate={setCoordinate} dispatch={dispatch} />
            {state.caricamento && <p className="text-center" >Caricamento...</p>}
            {state.errore && <p>{state.errore}</p>}
            <div className='d-flex'>

                {state.meteo.map((m, index) => (
                    < Meteoinfo key={index} meteo={m} aggiungiPreferito={aggiungiPreferito} />))}
            </div>
            <PreferMeteo preferiti={preferiti}
                onSeleziona={(c) => setCoordinate(c)}
                onRimuovi={rimuoviPreferito} />
        </div>
    );
}