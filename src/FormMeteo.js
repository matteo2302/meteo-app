import { useState } from "react"
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';


function FormMeteo({ setCoordinate }) {
    let [citta, setCitta] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (citta.trim() === "") return;
        try {
            let res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${citta}`);
            let data = await res.json();
            if (!data.results || data.results.length === 0) {
                throw new Error("Città non trovata");
            }
            let { latitude, longitude, name } = data.results[0];
            setCoordinate({ latitude, longitude, nome: name });

        } catch (err) {
            console.error("Errore:", err.message);
        }
    }
    return (
        <div>

            <form onSubmit={handleSubmit}>
                <InputGroup className="mb-3">
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
        </div>
    )
}
export default FormMeteo;