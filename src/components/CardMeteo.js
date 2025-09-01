import { Card, Button } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';

function CardMeteo({ citta, isPreferito, onRimuovi, onAggiungi }) {
    return (
        <Card style={{ width: '18rem' }}>
            {citta.image && (
                <Card.Img
                    variant="top"
                    src={citta.image}
                    alt={citta.nome}
                    style={{ height: "200px", objectFit: "cover" }}
                />
            )}
            <Card.Body>
                <Card.Title>{citta.nome}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>🌡️ {citta.temperature ?? "N/D"}°C</ListGroup.Item>
                <ListGroup.Item>💨 Vento: {citta.windspeed ?? "N/D"} km/h</ListGroup.Item>
            </ListGroup>
            <Card.Body>
                <div className="d-flex gap-2">
                    <Button
                        as={Link}
                        to={`/DettagliMeteo/${citta.nome}`}
                        state={{ latitude: citta.latitude, longitude: citta.longitude }}
                        variant="primary"
                    >
                        Dettagli
                    </Button>
                    {isPreferito ? (
                        <Button variant="danger" onClick={() => onRimuovi(citta.nome)}>Rimuovi ⭐</Button>
                    ) : (
                        <Button variant="success" onClick={() => onAggiungi(citta)}>Aggiungi ⭐</Button>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
}

export default CardMeteo;
