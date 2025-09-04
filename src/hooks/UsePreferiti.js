import { useEffect, useState } from "react";


function UsePreferiti() {
    const STORAGE_KEY = "preferiti";


    const [preferiti, setPreferiti] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    });


    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(preferiti));
    }, [preferiti]);


    const aggiungiPreferito = (citta) => {
        if (!preferiti.some(p => p.nome === citta.nome)) {
            const nuovaCitta = {
                ...citta,
                latitude: citta.latitude ?? citta.lat,
                longitude: citta.longitude ?? citta.lon
            };
            setPreferiti(prev => [...prev, nuovaCitta]);
        }
    };

    const rimuoviPreferito = (nome) => {
        setPreferiti(c => c.nome !== nome);
    };

    const isPreferito = (nome) => {
        return preferiti.some(c => c.nome === nome);
    };
    return { preferiti, aggiungiPreferito, rimuoviPreferito, isPreferito }
}
export default UsePreferiti;