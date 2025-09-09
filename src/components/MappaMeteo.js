import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";

function ChangeView({ center, zoom }) {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.setView(center, zoom);
        }
    }, [center, zoom, map]);
    return null;
}

function ClickHandler({ onSelect }) {
    useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;
            onSelect({ latitude: lat, longitude: lng, nome: `(${lat.toFixed(2)}, ${lng.toFixed(2)})` });
        }
    });
    return null;
}

function MappaMeteo({ onSelect, coordinate }) {
    const initialMarker = (coordinate && coordinate.latitude && coordinate.longitude)
        ? [coordinate.latitude, coordinate.longitude]
        : null;
    const [marker, setMarker] = useState(initialMarker);

    useEffect(() => {
        if (coordinate && coordinate.latitude && coordinate.longitude) {
            setMarker([coordinate.latitude, coordinate.longitude]);
        }
    }, [coordinate]);

    const center = marker || [44.1, 8.27];

    return (
        <MapContainer
            className="leaflet-container"
            center={center}
            zoom={marker ? 12 : 6}
            scrollWheelZoom={true}
        >
            <ChangeView center={center} zoom={marker ? 12 : 6} />
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <ClickHandler onSelect={(coord) => {
                setMarker([coord.latitude, coord.longitude]);
                onSelect(coord);
            }} />
            {marker && <Marker position={marker} />}
        </MapContainer>
    );
}

export default MappaMeteo;
