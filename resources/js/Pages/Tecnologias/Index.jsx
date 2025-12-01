import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { Head, router } from '@inertiajs/react';
import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useState } from "react";
import HeaderCRUD from '../../Components/CRUD/HeaderCRUD.jsx';

export default function Index({ auth, tecnologias: tecnologiasIniciales }) {
    const [tecnologias, setTecnologias] = useState(tecnologiasIniciales || []);
    const [openModal, setOpenModal] = useState(false);
    const [tecnologiaSeleccionada, setTecnologiaSeleccionada] = useState(null);

    // Abrir modal de confirmación
    const abrirModal = (tec) => {
        setTecnologiaSeleccionada(tec);
        setOpenModal(true);
    };

    // Eliminar tecnología
    const handleDelete = () => {
        if (!tecnologiaSeleccionada) return;

        router.delete(route('tecnologias.destroy', tecnologiaSeleccionada.id), {
            onSuccess: () => {
                // Filtrar la tecnología eliminada de la lista
                setTecnologias(tecnologias.filter(t => t.id !== tecnologiaSeleccionada.id));
                setOpenModal(false);
                setTecnologiaSeleccionada(null);
                router.reload();
            },
            onError: (errors) => {
                console.error(errors);
                alert("Error al eliminar la tecnología");
            }
        });
    };

    return (
        <>
            <Head title="Tecnologías" />
            <div>
                <HeaderCRUD user={auth.user} />

                <main>
                    <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8 py-12">

                        {/* Encabezado */}
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="flex justify-between items-center p-6 text-gray-900">
                                <h1 className="text-center h-full text-2xl font-bold">Tecnologías</h1>

                                <a
                                    href={route('tecnologias.create')}
                                    className="botonCrearCRUD p-3 bg-green-300 text-black rounded-lg hover:bg-green-500 focus:scale-90 transition duration-200"
                                >
                                    Crear Nueva Tecnología
                                </a>
                            </div>
                        </div>

                        {/* Tabla */}
                        <div className="overflow-x-auto shadow-sm bg-white rounded-lg">
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableHeadCell>ID</TableHeadCell>
                                        <TableHeadCell>Nombre</TableHeadCell>
                                        <TableHeadCell>Tipo</TableHeadCell>
                                        <TableHeadCell>Imagen para el modo claro</TableHeadCell>
                                        <TableHeadCell>Imagen para el modo oscuro</TableHeadCell>
                                        <TableHeadCell className="flex flex-col items-center">Acciones</TableHeadCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody className="divide-y">
                                    {tecnologias && tecnologias.length > 0 ? (
                                        tecnologias.map((tec) => (
                                            <TableRow key={tec.id}>
                                                <TableCell className="celdaCRUD">{tec.id}</TableCell>
                                                <TableCell className="celdaCRUD">{tec.nombre}</TableCell>
                                                <TableCell className="celdaCRUD">{tec.tipo_tecnologia.nombre || "Sin tipo"}</TableCell>
                                                <TableCell className="celdaCRUD">
                                                    {tec.imagen_clara ? (
                                                        <img
                                                            src={`/${tec.imagen_clara}`}
                                                            alt={tec.nombre}
                                                            className="h-16 rounded-md object-cover"
                                                        />
                                                    ) : (
                                                        <span className="text-gray-500 italic">Sin imagen</span>
                                                    )}
                                                </TableCell>
                                                <TableCell className="celdaCRUD">
                                                    {tec.imagen_oscura ? (
                                                        <img
                                                            src={`/${tec.imagen_oscura}`}
                                                            alt={tec.nombre}
                                                            className="h-16 rounded-md object-cover"
                                                        />
                                                    ) : (
                                                        <span className="text-gray-500 italic">Sin imagen</span>
                                                    )}
                                                </TableCell>
                                                <TableCell className="celdaCRUD flex h-24 justify-between items-center">
                                                    <a
                                                        href={route('tecnologias.show', tec.id)}
                                                        className="botonEditarCRUD font-medium text-primary-600 hover:underline"
                                                    >
                                                        Ver
                                                    </a>

                                                    <a
                                                        href={route('tecnologias.edit', tec.id)}
                                                        className="botonEditarCRUD text-blue-600 font-medium text-primary-600 hover:underline"
                                                    >
                                                        Editar
                                                    </a>

                                                    {/* Botón eliminar que abre modal */}
                                                    <button
                                                        type="button"
                                                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md"
                                                        onClick={() => abrirModal(tec)}
                                                    >
                                                        Eliminar
                                                    </button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan="5" className="celdaCRUD text-center py-6">
                                                No hay tecnologías disponibles.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </main>

                {/* Modal de confirmación */}
                {tecnologiaSeleccionada && (
                    <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                        <ModalHeader />
                        <ModalBody>
                            <div className="text-center">
                                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400" />
                                <h3 className="mb-5 text-lg font-normal text-gray-500">
                                    ¿Estás seguro de que deseas eliminar la tecnología <strong>{tecnologiaSeleccionada.nombre}</strong>?
                                </h3>
                                <div className="flex justify-center gap-4">
                                    <Button color="red" onClick={handleDelete}>
                                        Sí, eliminar
                                    </Button>
                                    <Button color="gray" onClick={() => setOpenModal(false)}>
                                        Cancelar
                                    </Button>
                                </div>
                            </div>
                        </ModalBody>
                    </Modal>
                )}
            </div>
        </>
    );
}
