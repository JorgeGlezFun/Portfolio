import React, { useState } from "react";
import Modal from "@/Components/Modal"; // 👈 Usa el modal de Laravel + React
import img1 from "../../img/logos/arttattoo.png";
import img2 from "../../img/logos/uca.png";

export default function CoverflowCarousel() {
  const slides = [
    {
      id: 1,
      nombre: "ArtTattooPMG",
      descripcion: "Plataforma web para gestión de citas.",
      tecnologias: ["React", "Laravel", "MySQL"],
      foto: img1,
    },
    {
      id: 2,
      nombre: "UCA Robotics",
      descripcion: "Web del equipo de robótica de la UCA.",
      tecnologias: ["Vue", "TailwindCSS", "Firebase"],
      foto: img2,
    },
  ];

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);

  const prev = () =>
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  const next = () =>
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  const goToSlide = (index) => setCurrent(index);

  // 👉 Lógica de click en slide
  const handleSlideClick = (index, slide) => {
    if (index === current) {
      // Si ya es el slide principal → abrir modal
      setSelected(slide);
    } else {
      // Si no es el principal → mover carrusel
      setCurrent(index);
    }
  };

  return (
    <div
    className="bloqueCarrusel"
    data-animate
    data-fade-up
    >
      <div className="bloqueSlides">
        {slides.map((slide, i) => {
          const offset = i - current;
          const absOffset = Math.abs(offset);
          const translateX = offset * 250;
          const scale = 1 - absOffset * 0.15;
          const opacity = 1 - absOffset * 0.3;
          const zIndex = 10 - absOffset;

          return (
            <div
              key={slide.id}
              className={`slidePrincipal ${
                i === current ? "slideActivo" : "slideInactivo"
              }`}
              style={{
                transform: `translateX(${translateX}px) scale(${scale})`,
                opacity,
                zIndex,
              }}
              onClick={() => handleSlideClick(i, slide)}
            >
              <img src={slide.foto} alt={slide.nombre} className="fotoSlide" />
            </div>
          );
        })}
      </div>

      {/* Controles del carrusel */}
      <div className="contenedorBotonesSlide">
        <button onClick={prev} className="btnSlide">
          {"<"}
        </button>

        {/* Dots */}
        <div className="contenedorDots">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`dotsSlide ${
                index === current
                  ? "dotsSlideActivo"
                  : "dotsSlideInactivo"
              }`}
            />
          ))}
        </div>

        <button onClick={next} className="btnSlide">
          {">"}
        </button>
      </div>

      {/* Modal (solo se abre si el slide principal fue clicado) */}
      <Modal show={!!selected} onClose={() => setSelected(null)}>
        {selected && (
          <div className="contenedorModal">
            <img
              src={selected.foto}
              alt={selected.nombre}
              className="fotoModal"
            />
            <div className="contenedorTextoModal">
              <h2 className="tituloModal">{selected.nombre}</h2>
              <div className="contenedorTecnologias">
                {selected.tecnologias.map((tec) => (
                  <span key={tec} className="tecnologiasModal">
                    {tec}
                  </span>
                ))}
              </div>
              <p className="textoModal">{selected.descripcion}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
