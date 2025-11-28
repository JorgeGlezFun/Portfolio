import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "@/Components/ThemeContext";
import axios from "axios";
import Modal from "@/Components/Modal"; // 👈 Usa el modal de Laravel + React

export default function Carrusel() {
    const { modo } = useContext(ThemeContext);
    const [proyectos, setProyectos] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/carrusel")
        .then(res => setProyectos(res.data));
    }, []);

    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState(null);

    if (!proyectos || proyectos.length === 0) return null;

    const prev = () =>
        setCurrent((prev) => (prev === 0 ? proyectos.length - 1 : prev - 1));

    const next = () =>
        setCurrent((prev) => (prev === proyectos.length - 1 ? 0 : prev + 1));

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
        className="bloqueCarrusel transition-all duration-700 ease-out w-full"
        data-animate
        data-fade-up
        >
            <div className="bloqueSlides">
                {proyectos.map((slide, i) => {
                const offset = i - current;
                const absOffset = Math.abs(offset);
                const translateX = offset * 250;
                const scale = 1 - absOffset * 0.15;
                const opacity = 1 - absOffset * 0.9;
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
                    <img src={modo ? slide.imagen_clara : slide.imagen_oscura} alt={slide.nombre} className="fotoSlide" />
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
                {proyectos.map((_, index) => (
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
                    <a href={"https://" + selected.enlace} className="fotoEnlaceModal" target="_blank" rel="noopener noreferrer">
                        <img
                        src={modo ? selected.imagen_clara : selected.imagen_oscura}
                        alt={selected.nombre}
                        className="fotoModal"
                        />
                    </a>
                    <div className="contenedorTextoModal">
                    <h2 className="tituloModal">{selected.nombre}</h2>
                    <div className="contenedorTecnologias">
                        {selected.tecnologias.map((tec) => (
                        <span key={tec.nombre} className="tecnologiasModal">
                            {tec.nombre}
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
