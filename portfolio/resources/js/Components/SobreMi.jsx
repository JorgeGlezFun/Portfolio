import React, { useEffect } from "react";
import "../../css/app.css"; // aquí está el @keyframes fadeUp

export default function SobreMi() {
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

  return (
    <div id="SobreMi" className="bloqueSobreMi">
      <div
        data-animate
        data-fade-down
        className="opacity-0 transition-all duration-700 ease-out w-full"
      >
        <h1 className="titulos">// Sobre mí</h1>
        <p className="textos">
        Hola, soy Jorge, un desarrollador web apasionado por crear experiencias digitales limpias, funcionales y centradas en el usuario. Trabajo con tecnologías como Laravel, React y TailwindCSS, combinando el lado técnico con un enfoque en el diseño UI/UX para dar vida a proyectos modernos y atractivos.
        <br />
        Me motiva el aprendizaje continuo y disfruto enfrentarme a nuevos retos que me permitan crecer como profesional. Creo en la importancia de la creatividad, la colaboración y la búsqueda de soluciones prácticas que aporten valor real.
        <br />
        Cuando no estoy programando, me gusta explorar el diseño gráfico y mantenerme al día con las últimas tendencias tecnológicas. 🚀 <br />
        Si quieres saber más sobre mi trabajo o colaborar en un proyecto, estaré encantado de hablar contigo.
        </p>
      </div>
      <div className="flex flex-col 2xl:flex-row justify-between w-full space-y-12 2xl:space-y-0 textos">
        <div
            data-animate
            data-fade-right
            className="opacity-0 transition-all duration-700 ease-out w-full"
        >
            <h2 className="titulos">&gt; Aptitudes</h2>
            <ol>
                <li>Experiencia en atención al cliente.</li>
                <li>Manejo y resolución de problemas con clientes.</li>
                <li>Conocimientos de programación web y microinformática.</li>
                <li>Desarrollo de prototipos web aplicando herramientas de diseño especializadas.</li>

            </ol>
        </div>
        <div
            data-animate
            data-fade-left
            className="opacity-0 transition-all duration-700 ease-out w-full"
        >
            <h2 className="titulos">&gt; Actitudes</h2>
            <ol>
                <li>Concentración absoluta en el trabajo.</li>
                <li>Gran interés por aprender nuevas tecnologías.</li>
                <li>Creatividad para el diseño web.</li>
                <li>Adaptabilidad a los cambios.</li>
            </ol>
        </div>
      </div>
    </div>
  );
}

