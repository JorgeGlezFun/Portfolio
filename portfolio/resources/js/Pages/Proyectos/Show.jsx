import { Head, Link } from '@inertiajs/react';
import HeaderCRUD from '../../Components/CRUD/HeaderCRUD.jsx';

export default function Show({ auth, proyecto }) {
    return (
        <>
            <Head title={`Proyecto: ${proyecto.nombre}`} />
            <div>
                <HeaderCRUD user={auth.user} />

                <main>
                    <div className="mx-auto max-w-4xl space-y-6 sm:px-6 lg:px-8 py-12">

                        {/* Encabezado */}
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="flex justify-between items-center p-6 text-gray-900">
                                <h1 className="text-2xl font-bold">{proyecto.nombre}</h1>

                                <div className="flex space-x-2">
                                    <Link
                                        href={route('proyectos.index')}
                                        className="px-4 py-2 bg-gray-200 text-black rounded-lg hover:bg-gray-300 focus:scale-90 transition duration-200"
                                    >
                                        Volver
                                    </Link>

                                    <Link
                                        href={route('proyectos.edit', proyecto.id)}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:scale-90 transition duration-200"
                                    >
                                        Editar
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Detalles del proyecto */}
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6 space-y-4">
                            {/* Imagen */}
                            {proyecto.imagen ? (
                                <img
                                    src={`/${proyecto.imagen}`}
                                    alt={proyecto.nombre}
                                    className="w-full max-h-80 object-cover rounded-md"
                                />
                            ) : (
                                <span className="text-gray-500 italic">Sin imagen</span>
                            )}

                            {/* Descripción */}
                            <div>
                                <h2 className="text-xl font-semibold mb-2">Descripción:</h2>
                                <p className="text-gray-700">{proyecto.descripcion}</p>
                            </div>

                            {/* Tecnologías */}
                            <div>
                                <h2 className="text-xl font-semibold mb-2">Tecnologías asociadas:</h2>
                                {proyecto.tecnologias && proyecto.tecnologias.length > 0 ? (
                                    <ul className="list-disc list-inside space-y-1">
                                        {proyecto.tecnologias.map((tec) => (
                                            <li key={tec.id}>
                                                {tec.nombre} ({tec.tipoTecnologias?.nombre || 'Sin tipo'})
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-500 italic">No hay tecnologías asociadas.</p>
                                )}
                            </div>
                        </div>

                    </div>
                </main>
            </div>
        </>
    );
}
