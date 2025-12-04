import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "@/Components/ThemeContext";
import { Head } from '@inertiajs/react';

import logoPO from "../../img/logos/logos_empresa/LW_1B.png"; // Pequeño Oscuro
import logoPC from "../../img/logos/logos_empresa/LW_2B.png"; // Pequeño Claro

import "../../css/app.css";

export default function Inicio() {
    const { modo } = useContext(ThemeContext);
    const [isLarge, setIsLarge] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsLarge(window.innerWidth >= 1536);
        window.addEventListener("resize", handleResize);
        handleResize(); // Tamaño inicial
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Objeto para mapear modo + tamaño a logo
    const logos = {
        dark: logoPC,
        light: logoPO,
    };

    const logoSrc = logos[modo ? "dark" : "light"];

    return (
        <div className={modo ? "dark" : ""}>
            <div id="Inicio" className="bloqueInicio">
                <div className="contenedorFotoInicio">
                    <img src={logoSrc} className="fotoInicio" />
                </div>
                <div className="barraSeparacion" />
                <div className="cuadroTextoInicio">
                    <div className="textosInicio">
                        <h1 className="tituloInicio">Jorge González Fuentes</h1>
                        <h2 className="tituloDev">DESARROLLADOR WEB</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}
