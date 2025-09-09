function UseGeolocalizzazione(setCoordinate) {
    if (!navigator.geolocation) {
        alert("La geolocalizzazione non è supportata dal tuo browser");
        return;
    }

    navigator.geolocation.getCurrentPosition(async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
            );
            const data = await res.json();

            // Provo a prendere city/town/village/state/county
            const city =
                data.address.city ||
                data.address.town ||
                data.address.village ||
                data.address.hamlet ||
                data.address.county ||
                data.address.state ||
                "Posizione sconosciuta";

            setCoordinate({
                latitude: lat,
                longitude: lon,
                nome: city
            });
        } catch (err) {
            console.error(err);
            setCoordinate({
                latitude: lat,
                longitude: lon,
                nome: "La mia posizione"
            });
        }
    }, (err) => {
        console.error(err);
        alert("Impossibile ottenere la posizione");
    });
}

export default UseGeolocalizzazione;
