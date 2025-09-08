import "../../css/app.css";

export default function Inicio({displayedText}) {
    return (
    <div id="Inicio" className="bloqueInicio min-h-screen">
        <div className="fotoInicio" />
        <div className="cuadroTextoInicio">
            <h1 className="titulos">Bienvenido</h1>
            <p className="textos">
                {displayedText}
                <span className="inline-block w-px h-5 bg-current animate-[blink_1s_steps(1)_infinite] align-[-2px]" />
            </p>
        </div>
    </div>
    );
}
