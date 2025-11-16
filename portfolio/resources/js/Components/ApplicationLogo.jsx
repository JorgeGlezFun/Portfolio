
// Arreglar el LOGIN err: useContext is undefined
import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "@/Components/ThemeContext";

import logoGO from "../../img/LW_1A.png"; // Grande Oscuro
import logoPO from "../../img/LW_1B.png"; // Pequeño Oscuro
import logoGC from "../../img/LW_2A.png"; // Grande Claro
import logoPC from "../../img/LW_2B.png"; // Pequeño Claro

export default function ApplicationLogo({ className = "" }) {
    const { modo } = useContext(ThemeContext);
    const [isLarge, setIsLarge] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsLarge(window.innerWidth >= 1536);
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Mapeo de logos según modo y tamaño
    const logos = {
        dark: {
            large: logoGC,
            small: logoPC
        },
        light: {
            large: logoGO,
            small: logoPO
        }
    };

    const logoSrc = logos[modo ? "dark" : "light"][isLarge ? "large" : "small"];

    return (
        <img
            src={logoSrc}
            alt="Jorge Gonzalez Fuentes - Web Developer"
            className={`${isLarge ? "w-48" : "w-24"} ${className}`}
        />
    );
}
