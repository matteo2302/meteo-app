import { Card, Button } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function CardMeteo({ citta, isPreferito, onRimuovi, onAggiungi, loading }) {
    if (loading) {
        return (
            <Card style={{ width: '18rem' }} className="p-3">
                <Skeleton height={200} /> {/* immagine finta */}
                <Card.Body>
                    <Card.Title>
                        <Skeleton height={25} width={120} />
                    </Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item><Skeleton height={20} width={100} /></ListGroup.Item>
                    <ListGroup.Item><Skeleton height={20} width={120} /></ListGroup.Item>
                </ListGroup>
                <Card.Body>
                    <div className="d-flex gap-2">
                        <Skeleton height={38} width={100} />
                        <Skeleton height={38} width={120} />
                    </div>
                </Card.Body>
            </Card>
        );
    }
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
