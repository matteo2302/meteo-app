import React from 'react';
import CardMeteo from "../components/CardMeteo";

export default function Preferiti({ preferiti, onSeleziona, onRimuovi }) {
    return (
        <div>
            <h2>Città preferite</h2>
            {preferiti.length > 0 ? (
                preferiti.map((c, i) => (
                    <CardMeteo
                        key={i}
                        citta={c}
                        onAggiungi={() => { }}
                        onRimuovi={onRimuovi}
                        isPreferito={true}
                    />
                ))
            ) : (
                <p>Nessuna città nei preferiti</p>
            )}
        </div>
    );
}
