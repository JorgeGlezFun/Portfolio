import { Head } from '@inertiajs/react';
import { useState } from "react";
import HeaderCRUD from '../../Components/CRUD/HeaderCRUD.jsx';

export default function Edit({ auth, laravelVersion, phpVersion, tiposExistentes, tecnologia }) {

    const [nombre, setNombre] = useState(tecnologia.nombre || "");
    const [imagenClara, setImagenClara] = useState(null);
    const [imagenOscura, setImagenOscura] = useState(null);
    const [tipoSeleccionado, setTipoSeleccionado] = useState(tecnologia.tipo_tecnologia_id || "");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute("content");

        const formData = new FormData();
        formData.append("nombre", nombre);
        if (imagenClara) formData.append("imagen_clara", imagenClara); // solo si hay nueva imagen
        if (imagenOscura) formData.append("imagen_oscura", imagenOscura); // solo si hay nueva imagen
        formData.append("tipo_tecnologia_id", tipoSeleccionado);
        formData.append("_method", "PUT"); // Laravel necesita esto para PUT en forms

        const response = await fetch(`/tecnologias/${tecnologia.id}`, {
            method: "POST", // se mantiene POST porque usamos _method=PUT
            headers: {
                "X-CSRF-TOKEN": token
            },
            body: formData,
        });

        const data = await response.json();

        if (response.ok) {
            alert("Tecnología actualizada ✅");
        } else {
            alert("Error al actualizar la tecnología ❌");
            console.log(data);
        }
    };

    return (
        <>
            <Head title={`Editar Tecnología: ${tecnologia.nombre}`} />
            <div>
                <HeaderCRUD user={auth.user} />

                <main>
                    <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8 py-12">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="flex flex-col items-center p-6 text-gray-900">

                                <h1 className="tituloCRUD w-full">Editar tecnología</h1>

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
                                            placeholder="Nombre de la tecnología"
                                            required
                                            value={nombre}
                                            onChange={(e) => setNombre(e.target.value)}
                                        />
                                    </div>

                                    {/* Imagen */}
                                    <div className="flex flex-col mb-4">
                                        <label htmlFor="imagen_clara" className="labelCRUD">Imagen para el modo claro (opcional):</label>
                                        {tecnologia.imagen_clara && (
                                                <img src={`/${tecnologia.imagen_clara}`} alt={tecnologia.nombre} className="mt-2 w-32 h-auto" />
                                            )}
                                        <input
                                            type="file"
                                            id="imagen_clara"
                                            name="imagen_clara"
                                            className="inputImagenCRUD p-4 rounded-md bg-gray-100 placeholder:text-gray-600"
                                            accept="image/*"
                                            onChange={(e) => setImagenClara(e.target.files[0])}
                                        />
                                    </div>

                                    <div className="flex flex-col mb-4">
                                        <label htmlFor="imagen_oscura" className="labelCRUD">Imagen para el modo oscuro (opcional):</label>
                                        {tecnologia.imagen_oscura && (
                                                <img src={`/${tecnologia.imagen_oscura}`} alt={tecnologia.nombre} className="mt-2 w-32 h-auto" />
                                            )}
                                        <input
                                            type="file"
                                            id="imagen_oscura"
                                            name="imagen_oscura"
                                            className="inputImagenCRUD p-4 rounded-md bg-gray-100 placeholder:text-gray-600"
                                            accept="image/*"
                                            onChange={(e) => setImagenOscura(e.target.files[0])}
                                        />
                                    </div>


                                    {/* Tipo de Tecnología */}
                                    <div className="flex flex-col mb-4">
                                        <label htmlFor="tipo" className="labelCRUD">Tipo de Tecnología:</label>
                                        {tiposExistentes.length > 0 ? (
                                            <select
                                                id="tipo_tecnologia_id"
                                                name="tipo_tecnologia_id"
                                                className="inputCRUD rounded-md bg-gray-100 placeholder:text-gray-600"
                                                required
                                                value={tipoSeleccionado}
                                                onChange={(e) => setTipoSeleccionado(e.target.value)}
                                            >
                                                <option value="">-- Selecciona un tipo --</option>
                                                {tiposExistentes.map((tipo) => (
                                                    <option key={tipo.id} value={tipo.id}>
                                                        {tipo.nombre}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : (
                                            <p className="text-gray-500 italic mt-2">No hay tipos de tecnologías disponibles.</p>
                                        )}
                                    </div>

                                    {/* Botón actualizar */}
                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            className="botonGuardarCRUD px-2 py-3 text-white bg-[#1d232c] rounded-lg focus:scale-90 transition duration-200"
                                        >
                                            Actualizar Tecnología
                                        </button>
                                    </div>

                                </form>
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
