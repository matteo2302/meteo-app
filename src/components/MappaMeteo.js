import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import { searchCity } from "../hooks/searchCity";

function ChangeView({ center, zoom }) {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.setView(center, zoom);
        }
    }, [center, zoom, map]);
    return null;
}

function ClickHandler({ onSelect, setMarker }) {
    useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;
            onSelect({ latitude: lat, longitude: lng, nome: `(${lat.toFixed(2)}, ${lng.toFixed(2)})` });
        }
    });
    return null;
}

function MappaMeteo({ onSelect, coordinate }) {
    const initialMarker =
        coordinate && coordinate.latitude && coordinate.longitude
            ? [coordinate.latitude, coordinate.longitude]
            : null;
    const [marker, setMarker] = useState(initialMarker);

    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (coordinate && coordinate.latitude && coordinate.longitude) {
            setMarker([coordinate.latitude, coordinate.longitude]);
        }
    }, [coordinate]);

    const center = marker || [44.1, 8.27];

    async function handleSearch(e) {
        e.preventDefault();
        if (!query.trim()) return;
        const data = await searchCity(query);
        setResults(data);
    }

    function handleSelect(result) {
        const lat = parseFloat(result.lat);
        const lon = parseFloat(result.lon);
        const nome = result.display_name.split(",")[0];
        setMarker([lat, lon]);
        onSelect({ latitude: lat, longitude: lon, nome });
        setResults([]);
        setQuery(nome);
    }






    return (
        <div>

            <form onSubmit={handleSearch} style={{ marginBottom: "8px" }}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Cerca città..."
                />
                <button type="submit">🔍</button>
            </form>

            {results.length > 0 && (
                <ul className="search-results">
                    {results.slice(0, 5).map((r) => (
                        <li key={r.place_id} onClick={() => handleSelect(r)}>
                            {r.display_name}
                        </li>
                    ))}
                </ul>
            )}
            <div className="mappa-wrapper">

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
                    <ClickHandler onSelect={onSelect} setMarker={setMarker} />
                    {marker && <Marker position={marker} />}
                </MapContainer>
            </div>
        </div>
    );
}

export default MappaMeteo;
