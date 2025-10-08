import logoGO from "../../img/LW_1A.png"
import logoPO from "../../img/LW_1B.png"
import logoGC from "../../img/LW_2A.png"
import logoPC from "../../img/LW_2B.png"
import "../../css/app.css";

export default function Inicio() {
    return (
    <div id="Inicio" className="bloqueInicio">
        <div className="contenedorFotoInicio">
            <img src={logoPO} className="fotoInicio" />
        </div>
        <div className="barraSeparacion" />
        <div className="cuadroTextoInicio">
            <h1 className="tituloInicio">Jorge González Fuentes</h1>
            <h1 className="tituloDev">DESARROLLADOR WEB</h1>
        </div>
    </div>
    );
}


