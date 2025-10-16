import React, { useEffect, useState } from "react";
import "../../css/app.css";
import Carrusel from '@/Components/Carrusel';

export default function Proyectos() {
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
    <div id="Proyectos" className="bloqueProyectos">
      <div
        data-animate
        {...(res ? { "data-fade-down": true } : { "data-fade-right": true })}
        className="opacity-0 transition-all duration-700 ease-out w-full"
      >
        <h1 className="titulos">// Proyectos</h1>
        <p className="textoListaConocimientos">
            A lo largo de mi camino como desarrollador web he ido aprendiendo y probando diferentes tecnologías que me han ayudado a entender mejor cómo dar forma a mis ideas. <br/>
            Me gusta experimentar, mejorar con cada proyecto y descubrir nuevas formas de hacer las cosas. <br/>
            Los conocimientos que verás aquí son parte de todo ese aprendizaje, el resultado de muchas horas de práctica, curiosidad y ganas de crear cosas que realmente funcionen y se vean bien.
        </p>
      </div>

        <Carrusel />

    </div>
  );
}

