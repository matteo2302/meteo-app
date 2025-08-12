import 'bootstrap/dist/css/bootstrap.min.css';

function Meteoinfo({ meteo }) {

    console.log(meteo);
    return (

        //<div><h5>{meteo.nome}</h5><p>ora di rilevazione:{new Date(meteo.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p><p>Temperatura: {meteo.temperature} °C</p><p>Velocità vento: {meteo.windspeed} km/h</p></div >///
        <div className="card" style={{ width: '18rem' }}>

            <div className="card-body">
                <h5 className="card-title">{meteo.nome}</h5>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">ora di rilevazione:{new Date(meteo.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</li>
                <li className="list-group-item">Temperatura: {meteo.temperature} °C</li>
                <li className="list-group-item">Velocità vento: {meteo.windspeed} km/h</li>
            </ul>
        </div>

    )
};
export default Meteoinfo;