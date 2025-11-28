import React, { useEffect, useState, useContext } from "react";
import { ThemeContext } from "@/Components/ThemeContext";
import "../../css/app.css";
import Carrusel from '@/Components/Carrusel';

export default function Proyectos() {
    const { modo } = useContext(ThemeContext);

    useEffect(() => {
    const elements = document.querySelectorAll("[data-animate]");

    const animationMap = {
        "data-fade-up": { translate: "fade-up", remove: "opacity-0" },
        "data-fade-down": { translate: "fade-down", remove: "opacity-0" },
        "data-fade-left": { translate: "fade-left", remove: "opacity-0" },
        "data-fade-right": { translate: "fade-right", remove: "opacity-0" },
    };

    const observer = new IntersectionObserver(
        (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const el = entry.target;

            Object.keys(animationMap).forEach((attr) => {
            if (el.hasAttribute(attr)) {
                el.classList.add("transition-all", "duration-700", "ease-out", animationMap[attr].translate);
                el.classList.remove(...animationMap[attr].remove);
            }
            });

            observer.unobserve(el);
        });
        },
        { threshold: 0.3 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
    }, []);

    const [res, setRes] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            setRes(window.innerWidth >= 1536);
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);



  return (
    <div className={modo ? "dark" : ""}>
        <div id="Proyectos" className="bloqueProyectos">
            <div
                data-animate
                {...(res ? { "data-fade-down": true } : { "data-fade-right": true })}
                className="opacity-0 transition-all duration-700 ease-out w-full"
            >
                <h1 className="titulos">// Proyectos</h1>
                <p className="textos">
                    En esta sección comparto una selección de proyectos web que reflejan mi trabajo como desarrollador
                    front-end y mi interés por crear experiencias digitales funcionales, atractivas y bien estructuradas.
                    Cada proyecto representa una oportunidad para aplicar distintas tecnologías,
                    experimentar con nuevas ideas y perfeccionar mi enfoque en la usabilidad y el diseño.
                    <br />
                    A través de esta galería podrás conocer brevemente el propósito de cada desarrollo, las herramientas
                    que utilicé y el proceso detrás de su realización. Si deseas explorar más a fondo los detalles de un proyecto,
                    puedes hacerlo navegando por el carrusel y descubriendo cada propuesta en mayor profundidad.
                    <br />
                    Mi objetivo con este espacio es mostrar no solo los resultados, sino también la manera en que enfrento los desafíos del desarrollo web y la pasión que pongo en cada línea de código.
                </p>
            </div>
            <Carrusel/>
        </div>
    </div>
  );
}

