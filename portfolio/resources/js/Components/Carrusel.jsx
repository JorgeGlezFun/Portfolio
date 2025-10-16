import React, { useEffect, useState } from "react";
import "../../css/app.css";
import img1 from "../../img/logos/arttattoo.png";
import img2 from "../../img/logos/uca.png";
export default function CoverflowCarousel() {
    const slides = [
    { id: 1, color: "bg-[#2d343f]", foto: img1 },
    { id: 2, color: "bg-[#2d343f]", foto: img2 },
    ];

    const [current, setCurrent] = useState(0);

    const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

    const nextSlide = () =>
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

    const goToSlide = (index) => setCurrent(index);

    return (
        <div
        data-animate
        data-fade-up
        className="flex flex-col items-center justify-center gap-6 opacity-0 transition-all duration-700 ease-out">
        <div className="h-[30rem] w-[30rem] relative flex items-center justify-center">
        {slides.map((slide, index) => {
            const offset = index - current;
            const absOffset = Math.abs(offset);
            const translateX = offset * 200;
            const scale = 1 - absOffset * 0.15;
            const opacity = 1 - absOffset * 0.3;
            const zIndex = 10 - absOffset;

            return (
            <div
                key={slide.id}
                className="absolute w-full h-full flex items-center justify-center text-white text-5xl font-bold rounded-2xl shadow-xl transition-all duration-500 bg-[#2d343f]"
                style={{
                transform: `translateX(${translateX}px) scale(${scale})`,
                opacity,
                zIndex,
                filter: absOffset === 0 ? "brightness(1)" : "brightness(0.5)",
                }}
            >
                <img src={slide.foto} alt="" />
            </div>
            );
        })}
        </div>

        {/* Controles (prev, dots, next) */}
        <div className="flex items-center justify-center gap-4 z-20">
        {/* Prev */}
        <button
            onClick={prevSlide}
            className="bg-black/40 text-white px-10 py-4 rounded-xl hover:bg-black/60 transition"
        >
            {'<'}
        </button>

        {/* Dots (indicadores) */}
        <div className="flex items-center justify-center gap-6">
            {slides.map((_, index) => (
            <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-6 h-6 rounded-full transition-all duration-300 ${
                index === current
                    ? "bg-white scale-125 shadow-md"
                    : "bg-white/40 hover:bg-white/60"
                }`}
            />
            ))}
        </div>

        {/* Next */}
        <button
            onClick={nextSlide}
            className="bg-black/40 text-white px-10 py-4 rounded-xl hover:bg-black/60 transition"
        >
            {'>'}
        </button>
        </div>
        </div>
    );
    }
