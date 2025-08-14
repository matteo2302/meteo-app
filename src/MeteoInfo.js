import styles from './MeteoInfo.module.css';
function Meteoinfo({ meteo }) {

    console.log(meteo);
    return (

        //<div><h5>{meteo.nome}</h5><p>ora di rilevazione:{new Date(meteo.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p><p>Temperatura: {meteo.temperature} °C</p><p>Velocità vento: {meteo.windspeed} km/h</p></div >///
        <div className={`card ${styles.customCard}`}>
            < div >
                <h5 className={styles.titleBox}>{meteo.nome}</h5>
            </div >
            <ul className={`${styles.customList} list-unstyled`}>
                <li>ora di rilevazione:{new Date(meteo.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</li>
                <li>Temperatura: {meteo.temperature} °C</li>
                <li>Velocità vento: {meteo.windspeed} km/h</li>
            </ul>
        </div >

    )
};
export default Meteoinfo;