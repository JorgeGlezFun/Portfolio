import React, { useEffect, useState } from "react";
import "../../css/app.css";
import github from "../../img/logos/github2logo.png";
import linkedin from "../../img/logos/linkedinlogo.png";
import telefono from "../../img/logos/telefonologo.png";
import gmail from "../../img/logos/emaillogo.png";

export default function Contacto() {

    const [res, setRes] = useState(false);
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [email, setEmail] = useState("");
    const [mensaje, setMensaje] = useState("");

    useEffect(() => {
        const handleResize = () => {
            setRes(window.innerWidth >= 1536);
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = document
        .querySelector('meta[name="csrf-token"]')
        ?.getAttribute("content");

        const response = await fetch("http://127.0.0.1:8000/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-CSRF-TOKEN": token },
        body: JSON.stringify({ nombre, apellido, email, mensaje }),
        });

        const data = await response.json();

        if (data.success) {
            alert("Mensaje enviado ✅");
            setNombre("");
            setApellido("");
            setEmail("");
            setMensaje("");
        } else {
            alert("Error al enviar el mensaje ❌");
        }
    };

    return (
        <div id="Contacto" className="bloqueContactos">
            <div
                data-animate
                {...(res ? { "data-fade-down": true } : { "data-fade-right": true })}
                className="opacity-0 transition-all duration-700 ease-out w-full"
            >
                <h1 className="titulos">// Contacto</h1>
            </div>
            <div className="contenedorContactos">
                <div className="contenedorOtrosMetodos">
                    <div id="contenedorEnlaces">
                        <div className="enlacesContacto">
                            <img src={linkedin} alt="Logo de LinkedIn" className="imagenContacto" />
                            <a href="https://www.linkedin.com/in/jorgegfdev" target="_blank">LinkedIn: Jorge González Fuentes</a>
                        </div>
                        <div className="enlacesContacto">
                            <img src={github} alt="Logo de GitHub" className="imagenContacto" />
                            <a href="https://github.com/JorgeGlezFun" target="_blank">GitHub: @JorgeGlezFun </a>

                        </div>
                        <div className="enlacesContacto">
                            <img src={gmail} alt="Logo de Correo Electrónico" className="imagenContacto" />
                            <a href="mailto:jorge.gonzalez.fuentes.dev@gmail.com" target="_blank">E-Mail: jorge.gonzalez.fuentes.dev@gmail.com</a>

                        </div>
                        <div className="enlacesContacto">
                            <img src={telefono} alt="Logo de Teléfono" className="imagenContacto" />
                            <a target="_blank">Teléfono: +34 671 71 04 04</a>
                        </div>
                    </div>
                </div>
                <div className="barraSeparacionContacto" />
                <div className="contenedorFormulario">
                    <form onSubmit={handleSubmit}>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}"/>
                        <div className="filaNombre">
                            <input
                                type="text"
                                name="nombre"
                                placeholder="Nombre"
                                className="inputsContacto"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                            <input
                                type="text"
                                name="apellido"
                                placeholder="Apellidos"
                                className="inputsContacto"
                                value={apellido}
                                onChange={(e) => setApellido(e.target.value)}
                            />
                        </div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="inputsContacto"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <textarea
                            name="mensaje"
                            placeholder="Mensaje"
                            className="inputsContacto"
                            value={mensaje}
                            onChange={(e) => setMensaje(e.target.value)}
                        ></textarea>
                        <button
                            type="submit"
                            className="botonContacto"
                        >
                            Enviar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
