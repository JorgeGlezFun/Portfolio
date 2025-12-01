import { Head, Link } from '@inertiajs/react';
import HeaderCRUD from '../../Components/CRUD/HeaderCRUD.jsx';

export default function Show({ auth, tipotecnologia }) {
    return (
        <>
            <Head title={`Proyecto: ${tipotecnologia.nombre}`} />
            <div>
                <HeaderCRUD user={auth.user} />

                <main>
                    <div className="mx-auto max-w-4xl space-y-6 sm:px-6 lg:px-8 py-12">

                        {/* Encabezado */}
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="flex justify-between items-center p-6 text-gray-900">
                                <h1 className="text-2xl font-bold">{tipotecnologia.nombre}</h1>

                                <div className="flex space-x-2">
                                    <Link
                                        href={route('tipotecnologias.index')}
                                        className="px-4 py-2 bg-gray-200 text-black rounded-lg hover:bg-gray-300 focus:scale-90 transition duration-200"
                                    >
                                        Volver
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Detalles del tipotecnologia */}
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6 space-y-4">

                            {/* Descripción */}
                            <div>
                                <h2 className="text-xl font-semibold mb-2">Nombre tipo de tecnología:</h2>
                                <p className="text-gray-700">{tipotecnologia.nombre}</p>
                            </div>
                        </div>

                    </div>
                </main>
            </div>
        </>
    );
}
