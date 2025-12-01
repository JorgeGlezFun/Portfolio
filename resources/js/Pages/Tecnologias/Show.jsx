import { Head, Link } from '@inertiajs/react';
import HeaderCRUD from '../../Components/CRUD/HeaderCRUD.jsx';

export default function Show({ auth, tecnologia }) {
    return (
        <>
            <Head title={`Proyecto: ${tecnologia.nombre}`} />
            <div>
                <HeaderCRUD user={auth.user} />

                <main>
                    <div className="mx-auto max-w-4xl space-y-6 sm:px-6 lg:px-8 py-12">

                        {/* Encabezado */}
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="flex justify-between items-center p-6 text-gray-900">
                                <h1 className="text-2xl font-bold">{tecnologia.nombre}</h1>

                                <div className="flex space-x-2">
                                    <Link
                                        href={route('tecnologias.index')}
                                        className="px-4 py-2 bg-gray-200 text-black rounded-lg hover:bg-gray-300 focus:scale-90 transition duration-200"
                                    >
                                        Volver
                                    </Link>

                                    <Link
                                        href={route('tecnologias.edit', tecnologia.id)}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:scale-90 transition duration-200"
                                    >
                                        Editar
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Detalles del tecnologia */}
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6 space-y-4">
                            <div className="flex flex-col">
                                <h2 className="text-xl font-semibold mb-2">Imagen modo claro: </h2>
                                {/* Imagen */}
                                {tecnologia.imagen_clara ? (
                                    <img
                                        src={`/${tecnologia.imagen_clara}`}
                                        alt={tecnologia.nombre}
                                        className="w-fit max-h-80 object-cover rounded-md"
                                    />
                                ) : (
                                    <span className="text-gray-500 italic">Sin imagen</span>
                                )}

                                <h2 className="text-xl font-semibold mb-2">Imagen modo oscuro: </h2>
                                {tecnologia.imagen_oscura ? (
                                    <img
                                        src={`/${tecnologia.imagen_oscura}`}
                                        alt={tecnologia.nombre}
                                        className="w-fit max-h-80 object-cover rounded-md"
                                    />
                                ) : (
                                    <span className="text-gray-500 italic">Sin imagen</span>
                                )}
                            </div>

                            {/* Descripción */}
                            <div>
                                <h2 className="text-xl font-semibold mb-2">Tipo de tecnología:</h2>
                                <p className="text-gray-700">{tecnologia.tipo_tecnologia.nombre}</p>
                            </div>
                        </div>

                    </div>
                </main>
            </div>
        </>
    );
}
