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
import CV from "../../assets/CV_Jorge_Gonzalez_Fuentes.pdf";

export default function Contacto() {
    const { modo } = useContext(ThemeContext);
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
                    <div className="contenedorOtrosMetodos">
                        <div id="contenedorEnlaces">
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
                            <a href={CV} download target="_blank" className="enlacesContacto">
                                <img src={!modo ? logoCVclaro : logoCVoscuro} alt="Logo de Curriculum Vitae" className="imagenContacto" />
                                <span className="tituloOtrosMetodos">Curriculum Vitae</span>
                            </a>
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
                                className="inputsContacto h-64"
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
        </div>
    );
}
