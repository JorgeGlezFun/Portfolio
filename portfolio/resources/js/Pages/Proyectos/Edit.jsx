import { Head, router } from '@inertiajs/react';
import { useState } from "react";
import HeaderCRUD from '../../Components/CRUD/HeaderCRUD.jsx';

export default function Edit({ auth, laravelVersion, phpVersion, proyecto, tecnologiasExistentes = [] }) {

    // Inicializamos los estados con los valores actuales del proyecto
    const [nombre, setNombre] = useState(proyecto.nombre || "");
    const [descripcion, setDescripcion] = useState(proyecto.descripcion || "");
    const [enlace, setEnlace] = useState(proyecto.enlace || "");
    const [imagen, setImagen] = useState(null); // solo nueva imagen si se sube
    const [tecnologias, setTecnologias] = useState(
        proyecto.tecnologias?.map(t => t.id) || []
    );

    const toggleTecnologia = (id) => {
        if (tecnologias.includes(id)) {
            setTecnologias(tecnologias.filter(t => t !== id));
        } else {
            setTecnologias([...tecnologias, id]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("descripcion", descripcion);
        formData.append("enlace", enlace);
        if (imagen) formData.append("imagen", imagen);
        formData.append("tecnologias", JSON.stringify(tecnologias));

        // ⚡ Spoofing PUT para que Laravel acepte la actualización
        formData.append("_method", "PUT");

        router.post(`/proyectos/${proyecto.id}`, formData, {
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title={`Editar Proyecto: ${proyecto.nombre}`} />
            <div>
                <HeaderCRUD user={auth.user} />

                <main>
                    <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8 py-12">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="flex flex-col p-6 text-gray-900">

                                <h1 className="tituloCRUD">Editar Proyecto</h1>

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

                                        {/* Enlace */}
                                        <div className="flex flex-col mb-4">
                                            <label htmlFor="enlace" className="labelCRUD">Enlace:</label>
                                            <textarea
                                                id="enlace"
                                                name="enlace"
                                                className="inputCRUD inset-shadow-xs rounded-md bg-gray-100 placeholder:text-gray-600"
                                                placeholder="Descripción del Proyecto"
                                                required
                                                value={enlace}
                                                onChange={(e) => setEnlace(e.target.value)}
                                            ></textarea>
                                        </div>

                                        {/* Imagen */}
                                        <div className="flex flex-col mb-4">
                                            <label htmlFor="imagen" className="labelCRUD">Imagen (opcional):</label>
                                            <input
                                                type="file"
                                                id="imagen"
                                                name="imagen"
                                                className="inputImagenCRUD p-4 rounded-md bg-gray-100 placeholder:text-gray-600"
                                                accept="image/*"
                                                onChange={(e) => setImagen(e.target.files[0])}
                                            />
                                            {proyecto.imagen && (
                                                <img src={`/${proyecto.imagen}`} alt={proyecto.nombre} className="mt-2 w-32 h-auto" />
                                            )}
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
                                                                checked={Array.isArray(tecnologias) && tecnologias.includes(tec.id)}
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
                                                Actualizar Proyecto
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
