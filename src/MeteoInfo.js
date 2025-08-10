function Meteoinfo({ meteo }) {

    console.log(meteo);
    return (

        <div>
            <p>ora di rilevazione:{new Date(meteo.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
            <p>Temperatura: {meteo.temperature} °C</p>
            <p>Velocità vento: {meteo.windspeed} km/h</p>
            <p>Direzione vento: {meteo.winddirection}°</p>
        </div>
    )
};
export default Meteoinfo;