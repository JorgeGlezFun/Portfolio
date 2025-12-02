import React, { useEffect, useState, useContext } from "react";
import { ThemeContext } from "@/Components/ThemeContext";
import "../../css/app.css";
import githubclaro from "../../img/logos/logos_tecnologias/modo_claro/githublogoblanco.png";
import githuboscuro from "../../img/logos/logos_tecnologias/modo_oscuro/githublogooscuronegro.png";
import linkedinclaro from "../../img/logos/logos_tecnologias/modo_claro/linkedinlogoclaro.png";
import linkedinoscuro from "../../img/logos/logos_tecnologias/modo_oscuro/linkedinlogooscuro.png";
import telefonoclaro from "../../img/logos/logos_tecnologias/modo_claro/telefonologoclaro.png";
import telefonooscuro from "../../img/logos/logos_tecnologias/modo_oscuro/telefonologooscuro.png";
import gmailclaro from "../../img/logos/logos_tecnologias/modo_claro/gmaillogoclaro.png";
import gmailoscuro from "../../img/logos/logos_tecnologias/modo_oscuro/gmaillogooscuro.png";
import logoCVclaro from "../../img/logos/logos_tecnologias/modo_claro/LogoCVclaro.png";
import logoCVoscuro from "../../img/logos/logos_tecnologias/modo_oscuro/LogoCVoscuro.png";

export default function Contacto() {
    const { modo } = useContext(ThemeContext);
    const [res, setRes] = useState(false);
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [email, setEmail] = useState("");
    const [mensaje, setMensaje] = useState("");

    // Estados de mensajes
    const [mensajeError, setMensajeError] = useState("");
    const [mensajeExito, setMensajeExito] = useState("");

    const [cvUrl, setCvUrl] = useState(null); // URL del curriculum
    const [loadingCv, setLoadingCv] = useState(true); // opcional: para mostrar spinner

    useEffect(() => {
        const handleResize = () => setRes(window.innerWidth >= 1536);
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Regex de seguridad
        const safeTextRegex = /^[\w\s.,¡!¿?@()'"-]*$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!nombre.trim() || !apellido.trim() || !email.trim() || !mensaje.trim()) {
            setMensajeError("Todos los campos son obligatorios.");
            return;
        }

        if (!safeTextRegex.test(nombre)) {
            setMensajeError("Nombre contiene caracteres no permitidos.");
            return;
        }

        if (!safeTextRegex.test(apellido)) {
            setMensajeError("Apellido contiene caracteres no permitidos.");
            return;
        }

        if (!emailRegex.test(email)) {
            setMensajeError("Introduce un email válido.");
            return;
        }

        if (!safeTextRegex.test(mensaje)) {
            setMensajeError("Mensaje contiene caracteres no permitidos.");
            return;
        }

        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");

        try {
            const response = await fetch("https://www.jorgegfdev.com/contacto", {
                method: "POST",
                headers: { "Content-Type": "application/json", "X-CSRF-TOKEN": token },
                body: JSON.stringify({ nombre, apellido, email, mensaje }),
            });

            const data = await response.json();

            if (data.success) {
                setMensajeExito("Mensaje enviado ✅");
                setMensajeError("");
                setNombre("");
                setApellido("");
                setEmail("");
                setMensaje("");

                // Desaparece automáticamente
                setTimeout(() => setMensajeExito(""), 3000);
            } else {
                setMensajeError("Error al enviar el mensaje ❌");
                setTimeout(() => setMensajeError(""), 3000);
            }
        } catch (error) {
            console.error(error);
            setMensajeError("Error al enviar el mensaje ❌");
            setTimeout(() => setMensajeError(""), 3000);
        }
    };

    useEffect(() => {
        const fetchCv = async () => {
            try {
                const response = await fetch("https://jorgegfdev.com/curriculum/latest");
                const data = await response.json();

                if (response.ok && data.url) {
                    setCvUrl(data.url); // guardamos la URL
                } else {
                    setCvUrl(null); // no hay CV disponible
                }
            } catch (error) {
                console.error(error);
                setCvUrl(null);
            } finally {
                setLoadingCv(false);
            }
        };

        fetchCv();
    }, []);

    const handlePreview = () => {
        if (cvUrl) {
            window.open(cvUrl, "_blank");
        }
    };


    return (
        <div className={modo ? "dark" : ""}>
            <div id="Contacto" className="bloqueContactos">
                <div
                    data-animate
                    {...(res ? { "data-fade-down": true } : { "data-fade-right": true })}
                    className="opacity-0 transition-all duration-700 ease-out w-full"
                >
                    <h1 className="titulos">// Contacto</h1>
                    <p className="textos">
                        Si deseas ponerte en contacto conmigo, ya sea para colaborar, preguntar sobre mi trabajo o cualquier otra consulta,
                        no dudes en hacerlo a través de los siguientes métodos que dejo a tu disposicion. <br />
                        Puedes visitar mis redes sociales o rellenar el formulario de contacto para enviarme un mensaje directamente.
                        Estaré encantado de conversar contigo. ¡Muchas gracias por visitar mi web!
                    </p>
                </div>

                <div className="contenedorContactos">
                    <div className="contenedorOtrosMetodos"

                    >
                        <div id="contenedorEnlaces"
                            className="opacity-0 transition-all duration-700 ease-out"
                            data-animate
                            {...res ? { "data-fade-left": true } : { "data-fade-up": true }}
                        >
                            <a href="https://www.linkedin.com/in/jorgegfdev" target="_blank" className="enlacesContacto">
                                <img src={!modo ? linkedinclaro : linkedinoscuro} alt="Logo de LinkedIn" className="imagenContacto" />
                                <span className="tituloOtrosMetodos">LinkedIn: Jorge González Fuentes</span>
                            </a>
                            <a href="https://github.com/JorgeGlezFun" target="_blank" className="enlacesContacto">
                                <img src={!modo ? githubclaro : githuboscuro} alt="Logo de GitHub" className="imagenContacto" />
                                <span className="tituloOtrosMetodos">GitHub: @JorgeGlezFun </span>
                            </a>
                            <a href="mailto:jorge.gonzalez.fuentes.dev@gmail.com" target="_blank" className="enlacesContacto">
                                <img src={!modo ? gmailclaro : gmailoscuro} alt="Logo de Correo Electrónico" className="imagenContacto" />
                                <span className="tituloOtrosMetodos">E-Mail: jorge.gonzalez.fuentes.dev@gmail.com</span>
                            </a>
                            <a target="_blank" className="enlacesContacto">
                                <img src={!modo ? telefonoclaro : telefonooscuro} alt="Logo de Teléfono" className="imagenContacto" />
                                <span className="tituloOtrosMetodos">Teléfono: +34 671 71 04 04</span>
                            </a>
                            <button
                                onClick={handlePreview}
                                disabled={!cvUrl}
                                className={`enlacesContacto ${!cvUrl ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                                <img
                                    src={!modo ? logoCVclaro : logoCVoscuro}
                                    alt="Logo de Curriculum Vitae"
                                    className="imagenContacto"
                                />
                                <span className="tituloOtrosMetodos">Curriculum Vitae</span>
                            </button>
                        </div>
                    </div>

                    <div className="barraSeparacionContacto"/>

                    <div className="contenedorFormulario">
                        <form onSubmit={handleSubmit}
                            className="opacity-0 transition-all duration-700 ease-out w-full"
                            data-animate
                            {...res ? { "data-fade-right": true } : { "data-fade-down": true }}
                        >
                            {mensajeError && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 transition-opacity duration-500">
                                    {mensajeError}
                                </div>
                            )}
                            {mensajeExito && (
                                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4 transition-opacity duration-500">
                                    {mensajeExito}
                                </div>
                            )}

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
                                className="inputsContacto h-64"
                                value={mensaje}
                                onChange={(e) => setMensaje(e.target.value)}
                            ></textarea>

                            <button type="submit" className="botonContacto">
                                Enviar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
