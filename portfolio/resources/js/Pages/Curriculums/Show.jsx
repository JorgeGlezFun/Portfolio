import { Head, Link } from '@inertiajs/react';
import HeaderCRUD from '../../Components/CRUD/HeaderCRUD.jsx';

export default function Show({ auth, curriculum }) {
    return (
        <>
            <Head title={`Curriculum: ${curriculum.nombre}`} />
            <div>
                <HeaderCRUD user={auth.user} />

                <main>
                    <div className="mx-auto max-w-4xl space-y-6 sm:px-6 lg:px-8 py-12">

                        {/* Encabezado */}
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="flex justify-between items-center p-6 text-gray-900">
                                <h1 className="text-2xl font-bold">{curriculum.nombre}</h1>

                                <div className="flex space-x-2">
                                    <Link
                                        href={route('curriculums.index')}
                                        className="px-4 py-2 bg-gray-200 text-black rounded-lg hover:bg-gray-300 focus:scale-90 transition duration-200"
                                    >
                                        Volver
                                    </Link>

                                    <Link
                                        href={route('curriculums.edit', curriculum.id)}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:scale-90 transition duration-200"
                                    >
                                        Editar
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Detalles del curriculum */}
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6 space-y-4">
                            <div className="flex flex-col">
                                <h2 className="text-xl font-semibold mb-2">Archivo PDF: </h2>
                                {/* Imagen */}
                                {curriculum.archivo ? (
                                    <a
                                        href={`/${curriculum.archivo}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                    >
                                        Ver archivo
                                    </a>
                                ) : (
                                    <span className="text-gray-500 italic">Sin archivo</span>
                                )}
                            </div>
                        </div>

                    </div>
                </main>
            </div>
        </>
    );
}
