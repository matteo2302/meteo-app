import React from 'react';
import { Link } from 'react-router-dom';

export default function Preferiti({ preferiti, onSeleziona, onRimuovi }) {
    return (<div>
        <h2>Città preferite</h2>
        <ul>
            {preferiti.map((c, i) => (
                <li key={i}>
                    {c.nome}
                    <button onClick={() => onSeleziona(c)}>Vai</button>
                    <button onClick={() => onRimuovi(c.nome)}>❌</button>
                    <Link to={`/DettagliMeteo/${c.nome}`} className="btn btn-sm btn-info ms-2">Dettaglio</Link>
                </li>
            ))}
        </ul>
    </div>)
}