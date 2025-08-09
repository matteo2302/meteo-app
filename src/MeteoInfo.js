function Meteoinfo({meteo}){
    return (
        
    <div>
      <p>Temperatura: {meteo.temperature} °C</p>
      <p>Velocità vento: {meteo.windspeed} km/h</p>
      <p>Direzione vento: {meteo.winddirection}°</p>
    </div>
    )
};
export default Meteoinfo;