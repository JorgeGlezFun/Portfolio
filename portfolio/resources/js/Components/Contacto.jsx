import React, { useEffect, useState } from "react";
import "../../css/app.css";

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

    console.log(nombre, apellido, email, mensaje);

    return (
        <div id="Contactos" className="bloqueContactos">
            <div
                data-animate
                {...(res ? { "data-fade-down": true } : { "data-fade-right": true })}
                className="opacity-0 transition-all duration-700 ease-out w-full"
            >
                <h1 className="titulos">// Contactos</h1>
                <p className="textos">
                    A lo largo de mi camino como desarrollador web he ido aprendiendo y probando diferentes tecnologías que me han ayudado a entender mejor cómo dar forma a mis ideas. <br/>
                    Me gusta experimentar, mejorar con cada proyecto y descubrir nuevas formas de hacer las cosas. <br/>
                    Los conocimientos que verás aquí son parte de todo ese aprendizaje, el resultado de muchas horas de práctica, curiosidad y ganas de crear cosas que realmente funcionen y se vean bien.
                </p>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input type="hidden" name="_token" value="{{ csrf_token() }}"></input>
                    <div className="flex space-x-4">
                        <input
                            type="text"
                            name="nombre"
                            placeholder="Nombre"
                            className="mb-4 p-2 rounded w-full text-black"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                        <input
                            type="text"
                            name="apellido"
                            placeholder="Apellido"
                            className="mb-4 p-2 rounded w-full text-black"
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)}
                        />
                    </div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="mb-4 p-2 rounded w-full text-black"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <textarea
                        name="mensaje"
                        placeholder="Mensaje"
                        className="mb-4 p-2 rounded w-full text-black"
                        value={mensaje}
                        onChange={(e) => setMensaje(e.target.value)}
                    ></textarea>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Enviar
                    </button>
                </form>
            </div>
        </div>
    );
}
