export default function PreferMeteo({ preferiti, onSeleziona, onRimuovi }) {
    return (
        <div>
            <h2>Città preferite</h2>
            <ul>
                {preferiti.map((c, i) => (
                    <li key={i}>
                        {c.nome}
                        <button onClick={() => onSeleziona(c)}>Vai</button>
                        <button onClick={() => onRimuovi(c.nome)}>❌</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}