
import React, { useEffect, useState } from "react";
import javascript from "../../img/logos/javascriptlogo.png";
import python from "../../img/logos/pythonlogo.png";
import java from "../../img/logos/javalogo.png";
import php from "../../img/logos/phplogo.png";
import html from "../../img/logos/html5logo.png";
import css from "../../img/logos/css3logo.png";
import postgresql from "../../img/logos/postgresqllogo.png";
import react from "../../img/logos/reactlogo.png";
import laravel from "../../img/logos/laravellogo.png";
import tailwindcss from "../../img/logos/tailwindcsslogo.png";
import git from "../../img/logos/gitlogo.png";
import github from "../../img/logos/githublogo.png";
import apache from "../../img/logos/apachelogo.png";
import figma from "../../img/logos/figmalogo.png";
import canva from "../../img/logos/canvalogo.png";

import "../../css/app.css"; // aquí está el @keyframes fadeUp

export default function Conocimientos() {
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
    <div id="Conocimientos" className="bloqueConocimientos">
      <div
        data-animate
        {...(res ? { "data-fade-down": true } : { "data-fade-right": true })}
        className="opacity-0 transition-all duration-700 ease-out w-full"
      >
        <h1 className="titulos">// Conocimientos</h1>
        <p className="textos">
            A lo largo de mi camino como desarrollador web he ido aprendiendo y probando diferentes tecnologías que me han ayudado a entender mejor cómo dar forma a mis ideas. <br/>
            Me gusta experimentar, mejorar con cada proyecto y descubrir nuevas formas de hacer las cosas. <br/>
            Los conocimientos que verás aquí son parte de todo ese aprendizaje, el resultado de muchas horas de práctica, curiosidad y ganas de crear cosas que realmente funcionen y se vean bien.
        </p>
      </div>
      <div className="bloqueListasConocimientos">
        <div
        className="listaConocimientos"
        data-animate
        {...(res ? { "data-fade-down": true } : { "data-fade-right": true })}
        >
            <h1
            className="tituloListaConocimientos"
            data-animate
            data-fade-right
            >Lenguajes de Programación</h1>
            <ol
            className="textoListaConocimientos"
            data-animate
            data-fade-right
            >
                <li className="imagenLista">
                    <img src={javascript} alt="Logo de Javascript" />
                    JavaScript
                </li>
                <li className="imagenLista">
                    <img src={python} alt="Logo de Python" />
                    Python
                </li>
                <li className="imagenLista">
                    <img src={java} alt="Logo de Java" />
                    Java
                </li>
                <li className="imagenLista">
                    <img src={php} alt="Logo de PHP" />
                    PHP
                </li>
                <li className="imagenLista">
                    <img src={html} alt="Logo de HTML5" />
                    HTML5
                </li>
                <li className="imagenLista">
                    <img src={css} alt="Logo de CSS3" />
                    CSS3
                </li>
                <li className="imagenLista">
                    <img src={postgresql} alt="Logo de PostgreSQL" />
                    PostgreSQL
                </li>
            </ol>
        </div>
        <div
        className="listaConocimientos"
        data-animate
        {...(res ? { "data-fade-down": true } : { "data-fade-right": true })}
        >
            <h1 className="tituloListaConocimientos"
            data-animate
            data-fade-right
            >Frameworks</h1>
            <ol
            className="textoListaConocimientos"
            data-animate
            data-fade-right
            >
                <li className="imagenLista">
                    <img src={react} alt="Logo de React" />
                    React
                </li>
                <li className="imagenLista">
                    <img src={laravel} alt="Logo de Laravel" />
                    Laravel
                </li>
                <li className="imagenLista">
                    <img src={tailwindcss} alt="Logo de TailwindCSS" />
                    TailwindCSS
                </li>
            </ol>
        </div>
        <div
        className="listaConocimientos"
        data-animate
        {...(res ? { "data-fade-down": true } : { "data-fade-right": true })}
        >
            <h1
            className="tituloListaConocimientos"
            data-animate
            data-fade-right
            >Tecnologías y herramientas de desarrollo</h1>
            <ol
            className="textoListaConocimientos"
            data-animate
            data-fade-right
            >
                <li className="imagenLista">
                    <img src={git} alt="Logo de Git" />
                    Git
                </li>
                <li className="imagenLista">
                    <img src={github} alt="Logo de GitHub" />
                    GitHub
                </li>
                <li className="imagenLista">
                    <img src={apache} alt="Logo de Apache" />
                    Apache
                </li>
                <li className="imagenLista">
                    <img src={figma} alt="Logo de Figma" />
                    Figma
                </li>
                <li className="imagenLista">
                    <img src={canva} alt="Logo de Canva" />
                    Canva
                </li>
            </ol>
        </div>
      </div>
    </div>
  );
}

