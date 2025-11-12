import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { Head, router } from '@inertiajs/react';
import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useState } from "react";
import HeaderCRUD from '../../Components/CRUD/HeaderCRUD.jsx';

export default function Index({ auth, proyectos: proyectosIniciales }) {
    const [proyectos, setProyectos] = useState(proyectosIniciales || []);
    const [openModal, setOpenModal] = useState(false);
    const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);

    // Abrir modal para confirmar eliminación
    const abrirModal = (proyecto) => {
        setProyectoSeleccionado(proyecto);
        setOpenModal(true);
    };

    // Eliminar proyecto
    const handleDelete = () => {
        if (!proyectoSeleccionado) return;

        router.delete(route('proyectos.destroy', proyectoSeleccionado.id), {
            onSuccess: () => {
                // Filtrar el proyecto eliminado de la lista local
                setProyectos(proyectos.filter(p => p.id !== proyectoSeleccionado.id));
                setOpenModal(false);
                setProyectoSeleccionado(null);
            },
        });
    };

    return (
        <>
            <Head title="JorgeGlezDev" />
            <div>
                <HeaderCRUD user={auth.user} />

                <main>
                    <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8 py-12">

                        {/* Encabezado */}
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="flex justify-between items-center p-6 text-gray-900">
                                <h1 className="text-center h-full text-2xl font-bold">Proyectos</h1>

                                <a
                                    href={route('proyectos.create')}
                                    className="botonCrearCRUD p-3 bg-green-300 text-black rounded-lg hover:bg-green-500 focus:scale-90 transition duration-200"
                                >
                                    Crear Nuevo Proyecto
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
                                        <TableHeadCell>Descripción</TableHeadCell>
                                        <TableHeadCell>Enlace</TableHeadCell>
                                        <TableHeadCell>Imagen</TableHeadCell>
                                        <TableHeadCell className="flex flex-col items-center">Acciones</TableHeadCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody className="divide-y">
                                    {proyectos && proyectos.length > 0 ? (
                                        proyectos.map((proyecto) => (
                                            <TableRow key={proyecto.id}>
                                                <TableCell className="celdaCRUD">{proyecto.id}</TableCell>
                                                <TableCell className="celdaCRUD">{proyecto.nombre}</TableCell>
                                                <TableCell className="celdaCRUD">{proyecto.descripcion}</TableCell>
                                                <TableCell className="celdaCRUD">
                                                    <a href={"https://" + proyecto.enlace} target="_blank" rel="noopener noreferrer">
                                                        {proyecto.enlace}
                                                    </a>
                                                </TableCell>
                                                <TableCell className="celdaCRUD">
                                                    {proyecto.imagen ? (
                                                        <img
                                                            src={`/${proyecto.imagen}`}
                                                            alt={proyecto.nombre}
                                                            className="h-16 rounded-md object-cover"
                                                        />
                                                    ) : (
                                                        <span className="text-gray-500 italic">Sin imagen</span>
                                                    )}
                                                </TableCell>
                                                <TableCell className="celdaCRUD flex h-24 justify-between items-center">
                                                    <a
                                                        href={route('proyectos.show', proyecto.id)}
                                                        className="botonEditarCRUD font-medium text-primary-600 hover:underline"
                                                    >
                                                        Ver
                                                    </a>

                                                    <a
                                                        href={route('proyectos.edit', proyecto.id)}
                                                        className="botonEditarCRUD text-blue-600 font-medium text-primary-600 hover:underline"
                                                    >
                                                        Editar
                                                    </a>

                                                    {/* Botón eliminar que abre el modal */}
                                                    <button
                                                        type="button"
                                                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md"
                                                        onClick={() => abrirModal(proyecto)}
                                                    >
                                                        Eliminar
                                                    </button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan="6" className="celdaCRUD text-center py-6">
                                                No hay proyectos disponibles.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </main>

                {/* Modal de confirmación */}
                {proyectoSeleccionado && (
                    <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                        <ModalHeader />
                        <ModalBody>
                            <div className="text-center">
                                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400" />
                                <h3 className="mb-5 text-lg font-normal text-gray-500">
                                    ¿Estás seguro de que deseas eliminar el proyecto <strong>{proyectoSeleccionado.nombre}</strong>?
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
