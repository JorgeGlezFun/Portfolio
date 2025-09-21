import "../../css/app.css";

export default function Inicio({displayedText}) {
    return (
    <div id="Inicio" className="bloqueInicio">
        <div className="fotoInicio" />
        <div className="cuadroTextoInicio">
            <h1 className="titulos">Bienvenido</h1>
            <p className="textos">
                {displayedText}
                <span className="inline-block w-1 h-8 bg-current animate-[blink_1s_steps(1)_infinite] align-[-2px]" />
            </p>
        </div>
    </div>
    );


}

// Hay que separar el cuadro de la foto y el de texto para que no se peguen, esto se hace segun resolucion
//
