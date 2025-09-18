import { useState } from "react"
import { Form, InputGroup, Button } from 'react-bootstrap';
import { searchCity } from "./hooks/searchCity";

function FormMeteo({ setCoordinate }) {
    let [citta, setCitta] = useState("");
    let [risultati, setRisultati] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (citta.trim() === "") return;
        try {
            let data = await searchCity(citta);
            if (!data || data.length === 0) {
                throw new Error("Città non trovata");
            }
            setRisultati(data.slice(0, 5));
            /*let { latitude, longitude, name } = data.results[0];
            setCoordinate({ latitude, longitude, nome: name });*/

        } catch (err) {
            console.error("Errore:", err.message);
        }
    }
    const handleSelect = (result) => {
        const lat = parseFloat(result.lat);
        const lon = parseFloat(result.lon);
        const nome = result.display_name.split(",")[0];
        setCoordinate({ latitude: lat, longitude: lon, nome });
        setRisultati([]);
        setCitta(nome);
    };
    return (
        <div>

            <form onSubmit={handleSubmit} className="d-flex justify-content-center">
                <InputGroup className="mb-3 search-group">
                    <Form.Control
                        placeholder="cerca citta!"
                        aria-label="cerca citta!"
                        aria-describedby="basic-addon2"
                        onChange={(e) => setCitta(e.target.value)} value={citta}
                    />
                    <Button variant="primary" type="submit">
                        Cerca
                    </Button>
                </InputGroup>
            </form>
            {risultati.length > 0 && (
                <div className="search-results d-flex flex-column align-items-center">
                    {risultati.map((r) => (
                        <Button className="btn-results" key={r.place_id} onClick={() => handleSelect(r)} variant="light">{r.display_name}</Button>

                    ))}
                </div>
            )}
        </div>
    )
}
export default FormMeteo;