import { Head } from '@inertiajs/react';
import { useState } from "react";
import HeaderCRUD from '../../Components/CRUD/HeaderCRUD.jsx';

export default function Create({ auth, laravelVersion, phpVersion, tecnologiasExistentes }) {

    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [imagen, setImagen] = useState(null);
    const [tecnologias, setTecnologias] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute("content");

        const formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("descripcion", descripcion);
        formData.append("imagen", imagen);
        formData.append("tecnologias", JSON.stringify(tecnologias));

        const response = await fetch("/proyectos", {
            method: "POST",
            headers: {
                "X-CSRF-TOKEN": token
            },
            body: formData,
        });

        const data = await response.json();

        if (response.ok) {
            alert("Proyecto creado ✅");
            setNombre("");
            setDescripcion("");
            setImagen(null);
            setTecnologias([]);
        } else {
            alert("Error al crear el proyecto ❌");
            console.log(data);
        }
    };

    const toggleTecnologia = (id) => {
        if (tecnologias.includes(id)) {
            setTecnologias(tecnologias.filter(t => t !== id));
        } else {
            setTecnologias([...tecnologias, id]);
        }
    };

    console.log(tecnologiasExistentes);

    return (
        <>
            <Head title="Crear Proyecto" />
            <div>
                <HeaderCRUD user={auth.user} />

                <main>
                    <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8 py-12">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="flex flex-col p-6 text-gray-900">

                                <h1 className="tituloCRUD">Crear nuevo proyecto</h1>

                                <div className="flex justify-center items-center">

                                    <form
                                        onSubmit={handleSubmit}
                                        className="formularioCRUD flex flex-col max-w-2xl w-full"
                                        encType="multipart/form-data"
                                    >

                                        {/* Nombre */}
                                        <div className="flex flex-col mb-4">
                                            <label htmlFor="nombre" className="labelCRUD">Nombre:</label>
                                            <input
                                                type="text"
                                                id="nombre"
                                                name="nombre"
                                                className="inputCRUD rounded-md bg-gray-100 placeholder:text-gray-600"
                                                placeholder="Nombre del Proyecto"
                                                required
                                                value={nombre}
                                                onChange={(e) => setNombre(e.target.value)}
                                            />
                                        </div>

                                        {/* Descripción */}
                                        <div className="flex flex-col mb-4">
                                            <label htmlFor="descripcion" className="labelCRUD">Descripción:</label>
                                            <textarea
                                                id="descripcion"
                                                name="descripcion"
                                                className="inputCRUD inset-shadow-xs rounded-md bg-gray-100 placeholder:text-gray-600"
                                                placeholder="Descripción del Proyecto"
                                                required
                                                value={descripcion}
                                                onChange={(e) => setDescripcion(e.target.value)}
                                            ></textarea>
                                        </div>

                                        {/* Imagen */}
                                        <div className="flex flex-col mb-4">
                                            <label htmlFor="imagen" className="labelCRUD">Imagen:</label>
                                            <input
                                                type="file"
                                                id="imagen"
                                                name="imagen"
                                                className="inputImagenCRUD p-4 rounded-md bg-gray-100 placeholder:text-gray-600"
                                                accept="image/*"
                                                required
                                                onChange={(e) => setImagen(e.target.files[0])}
                                            />
                                        </div>

                                        {/* Tecnologías existentes */}
                                        <div className="flex flex-col mb-4">
                                            <label className="labelCRUD">Tecnologías asociadas:</label>

                                            {tecnologiasExistentes.length > 0 ? (
                                                <div className="flex flex-col space-y-2">
                                                    {tecnologiasExistentes.map((tec) => (
                                                        <label key={tec.id} className="flex items-center space-x-2">
                                                            <input
                                                                type="checkbox"
                                                                checked={tecnologias.includes(tec.id)}
                                                                onChange={() => toggleTecnologia(tec.id)}
                                                            />
                                                            <span>{tec.nombre}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-gray-500 italic mt-2">No hay tecnologías disponibles.</p>
                                            )}
                                        </div>

                                        {/* Botón guardar */}
                                        <div className="flex justify-end">
                                            <button
                                                type="submit"
                                                className="botonGuardarCRUD px-2 py-3 text-white bg-[#1d232c] rounded-lg focus:scale-90 transition duration-200"
                                            >
                                                Guardar Proyecto
                                            </button>
                                        </div>

                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                <footer>
                    Laravel v{laravelVersion} (PHP v{phpVersion})
                </footer>
            </div>
        </>
    );
}
