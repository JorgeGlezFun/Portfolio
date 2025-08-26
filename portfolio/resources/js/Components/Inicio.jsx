import "../../css/app.css";

export default function Inicio({displayedText}) {
    return (
    <div className="bloqueInicio">
        <div className="fotoInicio" />
        <div className="cuadroTextoInicio">
            <h1 className="tituloInicio">Bienvenido</h1>
            <p className="textoInicio">
                {displayedText}
                <span className="inline-block w-px h-5 bg-current animate-[blink_1s_steps(1)_infinite] align-[-2px]" />
            </p>
        </div>
    </div>
    );
}
