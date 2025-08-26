import React, { useEffect } from "react";
import "../../css/app.css"; // aquí está el @keyframes fadeUp

export default function FadeUpList() {
  useEffect(() => {
    const elements = document.querySelectorAll("[data-animate]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-up");
            entry.target.classList.remove("opacity-0", "translate-y-50");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="space-y-10">
      <div
        data-animate
        className="opacity-0 translate-y-10 transition-all duration-700 ease-out"
      >
        <h2 className="text-2xl font-bold">Elemento 1</h2>
      </div>

      <div
        data-animate
        className="opacity-0 translate-y-10 transition-all duration-700 ease-out"
      >
        <h2 className="text-2xl font-bold">Elemento 2</h2>
      </div>

      <div
        data-animate
        className="opacity-0 translate-y-10 transition-all duration-700 ease-out"
      >
        <h2 className="text-2xl font-bold">Elemento 3</h2>
      </div>
    </div>
  );
}
Hola, soy Jorge. Tengo 25 años y me dedico al desarrollo web, especializado en Laravel, React y TailwindCSS. Me apasiona crear interfaces limpias y funcionales, con un enfoque en el diseño UI/UX y la experiencia de usuario. También tengo experiencia en desarrollo full-stack, trabajo con Figma e integración de inteligencia artificial. Me considero una persona creativa, con ganas de seguir aprendiendo y que disfruta trabajando en equipo.
