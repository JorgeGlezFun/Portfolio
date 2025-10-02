import logoGO from "../../img/LW_1A.png"
import logoPO from "../../img/LW_1B.png"
import logoGC from "../../img/LW_2A.png"
import logoPC from "../../img/LW_2B.png"
import { useState, useEffect } from "react";
export default function ApplicationLogo(className) {
    const [logo, setLogo] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            setLogo(window.innerWidth >= 1536); // 1536px es el punto de quiebre '2xl' en Tailwind CSS
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Verificar el tamaño inicial

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <img
            src={logo ? logoGO : logoPO}
            alt="Jorge Gonzalez Fuentes - Web Developer"
            className={`${logo ? "w-48" : "w-24"}`}
        />
    );
}
