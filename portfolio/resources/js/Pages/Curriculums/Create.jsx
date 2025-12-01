import { Head } from '@inertiajs/react';
import { useState } from "react";
import HeaderCRUD from '../../Components/CRUD/HeaderCRUD.jsx';

export default function Create({ auth, laravelVersion, phpVersion }) {

    const [nombre, setNombre] = useState("");
    const [archivo, setArchivo] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute("content");

        const formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("archivo", archivo);

        const response = await fetch("/curriculums", {
            method: "POST",
            headers: {
                "X-CSRF-TOKEN": token
            },
            body: formData,
        });

        const data = await response.text();

        if (response.ok) {
            alert("Curriculum creado ✅");
            setNombre("");
            setArchivo(null);
        } else {
            alert("Error al crear el curriculum ❌");
            console.log(data);
        }
    };

    return (
        <>
            <Head title="Crear Curriculum" />
            <div>
                <HeaderCRUD user={auth.user} />

                <main>
                    <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8 py-12">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="flex flex-col items-center p-6 text-gray-900">

                                <h1 className="tituloCRUD w-full">Crear nuevo curriculum</h1>

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
                                        <input
                                            type="file"
                                            id="archivo"
                                            name="archivo"
                                            className="inputImagenCRUD p-4 rounded-md bg-gray-100 placeholder:text-gray-600"
                                            accept=".pdf,.doc,.docx"
                                            onChange={(e) => setArchivo(e.target.files[0])}
                                        />
                                    </div>

                                    {/* Botón guardar */}
                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            className="botonGuardarCRUD px-2 py-3 text-white bg-[#1d232c] rounded-lg focus:scale-90 transition duration-200"
                                        >
                                            Guardar Curriculum
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
