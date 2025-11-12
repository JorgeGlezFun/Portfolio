import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/app.css";

export default function Conocimientos() {
  const [tecnologias, setTecnologias] = useState([]);
  const [tiposExistentes, setTiposExistentes] = useState([]);
  const [res, setRes] = useState(false);

  // Carga de datos
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/conocimientos")
      .then((res) => {
        setTecnologias(res.data.tecnologias || []);
        setTiposExistentes(res.data.tiposExistentes || []);
      })
      .catch((err) => {
        console.error("Error al cargar los conocimientos:", err);
        setTecnologias([]);
        setTiposExistentes([]);
      });
  }, []);

  // Detectar ancho de pantalla
  useEffect(() => {
    const handleResize = () => setRes(window.innerWidth >= 1536);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Animaciones IntersectionObserver
  useEffect(() => {
    // Esperar a que haya datos renderizados
    if (tiposExistentes.length === 0) return;

    const elements = document.querySelectorAll("[data-animate]");
    if (!elements.length) return;

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
              el.classList.add(
                "transition-all",
                "duration-700",
                "ease-out",
                animationMap[attr].translate
              );
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
  }, [tiposExistentes, tecnologias, res]);

  return (
    <div id="Conocimientos" className="bloqueConocimientos">
      {/* Texto introductorio */}
      <div
        data-animate
        {...(res ? { "data-fade-down": true } : { "data-fade-right": true })}
        className="opacity-0 transition-all duration-700 ease-out w-full"
      >
        <h1 className="titulos">// Conocimientos</h1>
        <p className="textos">
          A lo largo de mi camino como desarrollador web he ido aprendiendo y probando diferentes
          tecnologías que me han ayudado a entender mejor cómo dar forma a mis ideas. <br />
          Me gusta experimentar, mejorar con cada proyecto y descubrir nuevas formas de hacer las cosas. <br />
          Los conocimientos que verás aquí son parte de todo ese aprendizaje, el resultado de muchas
          horas de práctica, curiosidad y ganas de crear cosas que realmente funcionen y se vean
          bien.
        </p>
      </div>

      {/* Listas de tecnologías */}
      <div className="bloqueListasConocimientos">
        {tiposExistentes.map((tipo) => (
          <div
            key={tipo.id}
            className="listaConocimientos"
            data-animate
            {...(res ? { "data-fade-down": true } : { "data-fade-right": true })}
          >
            <h1 className="tituloListaConocimientos" data-animate data-fade-right>
              {tipo.nombre}
            </h1>
            <ol className="textoListaConocimientos" data-animate data-fade-right>
              {tecnologias
                .filter((tec) => tec.tipo_tecnologia_id === tipo.id)
                .map((tec) => (
                  <li key={tec.id} className="imagenLista">
                    <img src={tec.imagen} alt={`Logo de ${tec.nombre}`} />
                    {tec.nombre}
                  </li>
                ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
}
