export async function searchCity(query) {
    const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
    );
    return res.json();
}
export default searchCity;