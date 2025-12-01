import { Head } from '@inertiajs/react';
import { useState } from "react";
import HeaderCRUD from '../../Components/CRUD/HeaderCRUD.jsx';

export default function Edit({ auth, laravelVersion, phpVersion, tiposExistentes, curriculum }) {

    const [nombre, setNombre] = useState(curriculum.nombre || "");
    const [archivo, setArchivo] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute("content");

        const formData = new FormData();
        formData.append("nombre", nombre);
        if (archivo) formData.append("archivo", archivo); // solo si hay nuevo archivo
        formData.append("_method", "PUT"); // Laravel necesita esto para PUT en forms

        const response = await fetch(`/curriculums/${curriculum.id}`, {
            method: "POST", // se mantiene POST porque usamos _method=PUT
            headers: {
                "X-CSRF-TOKEN": token
            },
            body: formData,
        });

        const data = await response.text();

        if (response.ok) {
            alert("Curriculum actualizado ✅");
        } else {
            alert("Error al actualizar el curriculum ❌");
            console.log(data);
        }
    };

    return (
        <>
            <Head title={`Editar Curriculum: ${curriculum.nombre}`} />
            <div>
                <HeaderCRUD user={auth.user} />

                <main>
                    <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8 py-12">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="flex flex-col items-center p-6 text-gray-900">

                                <h1 className="tituloCRUD w-full">Editar curriculum</h1>

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
                                            placeholder="Nombre del curriculum"
                                            required
                                            value={nombre}
                                            onChange={(e) => setNombre(e.target.value)}
                                        />
                                    </div>

                                    {/* Archivo */}
                                    <div className="flex flex-col mb-4">
                                        <label htmlFor="archivo" className="labelCRUD">Archivo (PDF, DOC, DOCX):</label>
                                        {curriculum.archivo && (
                                                <a
                                                    href={`/${curriculum.archivo}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:underline mb-2"
                                                >
                                                    Ver archivo actual
                                                </a>
                                            )}
                                        <input
                                            type="file"
                                            id="archivo"
                                            name="archivo"
                                            className="inputImagenCRUD p-4 rounded-md bg-gray-100 placeholder:text-gray-600"
                                            accept=".pdf,.doc,.docx"
                                            onChange={(e) => setArchivo(e.target.files[0])}
                                        />
                                    </div>

                                    {/* Botón actualizar */}
                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            className="botonGuardarCRUD px-2 py-3 text-white bg-[#1d232c] rounded-lg focus:scale-90 transition duration-200"
                                        >
                                            Actualizar Curriculum
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
