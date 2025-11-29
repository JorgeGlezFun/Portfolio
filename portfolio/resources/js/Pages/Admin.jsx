import '../../css/crud.css';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import HeaderCRUD from '@/Components/CRUD/HeaderCRUD';
import { Head, Link } from '@inertiajs/react';

export default function Admin(auth) {
    return (
        <>
            <Head title="Admin" />
            <HeaderCRUD user={auth.user} />

            <div>
                <main className='min-h-screen bg-gray-100 pt-[6.8677rem]'>
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 py-12">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900 space-y-6">
                                <h1 className='text-4xl font-bold'>Bienvenido a la sección de administración de la web.</h1>
                                <p className='text-xl'>
                                    Aquí podrás acceder a los datos de las tablas que hay en la web, así como insertar datos, editarlos y eliminarlos. <br />
                                    A continuación te muestro los apartados a los que puedes acceder:
                                </p>
                                <div className='flex justify-between'>
                                    <Link
                                            href={route('proyectos.index')}
                                            className="px-10 py-2 bg-gray-200 text-black text-2xl rounded-lg hover:bg-gray-300 focus:scale-90 transition duration-200"
                                        >
                                            Proyectos
                                    </Link>
                                    <Link
                                            href={route('tecnologias.index')}
                                            className="px-8 py-2 bg-gray-200 text-black text-2xl rounded-lg hover:bg-gray-300 focus:scale-90 transition duration-200"
                                        >
                                            Tecnologías
                                    </Link>
                                    <Link
                                            href={route('proyectos.index')}
                                            className="px-4 py-2 bg-gray-200 text-black text-2xl rounded-lg hover:bg-gray-300 focus:scale-90 transition duration-200"
                                        >
                                            Tipos de tecnología
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
