import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { Head, router } from '@inertiajs/react';
import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useState } from "react";
import HeaderCRUD from '../../Components/CRUD/HeaderCRUD.jsx';

export default function Index({ auth, curriculums }) {

    const [openModal, setOpenModal] = useState(false);
    const [curriculumSeleccionado, setCurriculumSeleccionado] = useState(null);
    const [curriculumsState, setCurriculums] = useState(curriculums || []);

    // Abrir modal de confirmación
    const abrirModal = (cv) => {
        setCurriculumSeleccionado(cv);
        setOpenModal(true);
    };

    // Eliminar curriculum
    const handleDelete = () => {
        if (!curriculumSeleccionado) return;

        router.delete(route('curriculums.destroy', curriculumSeleccionado.id), {
            onSuccess: () => {
                // Filtrar el curriculum eliminado de la lista
                setCurriculums(curriculums.filter(t => t.id !== curriculumSeleccionado.id));
                setOpenModal(false);
                setCurriculumSeleccionado(null);
                router.reload();
            },
            onError: (errors) => {
                console.error(errors);
                alert("Error al eliminar el curriculum");
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
                                <h1 className="text-center h-full text-2xl font-bold">Curriculums</h1>

                                <a
                                    href={route('curriculums.create')}
                                    className="botonCrearCRUD p-3 bg-green-300 text-black rounded-lg hover:bg-green-500 focus:scale-90 transition duration-200"
                                >
                                    Crear Nuevo Curriculum
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
                                        <TableHeadCell>Archivo</TableHeadCell>
                                        <TableHeadCell className="flex flex-col items-center">Acciones</TableHeadCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody className="divide-y">
                                    {curriculums && curriculums.length > 0 ? (
                                        curriculums.map((cv) => (
                                            <TableRow key={cv.id}>
                                                <TableCell className="celdaCRUD">{cv.id}</TableCell>
                                                <TableCell className="celdaCRUD">{cv.nombre}</TableCell>
                                                <TableCell className="celdaCRUD">{cv.archivo || "Sin archivo"}</TableCell>
                                                <TableCell className="celdaCRUD flex h-24 justify-between items-center">
                                                    <a
                                                        href={route('curriculums.show', cv.id)}
                                                        className="botonEditarCRUD font-medium text-primary-600 hover:underline"
                                                    >
                                                        Ver
                                                    </a>

                                                    <a
                                                        href={route('curriculums.edit', cv.id)}
                                                        className="botonEditarCRUD text-blue-600 font-medium text-primary-600 hover:underline"
                                                    >
                                                        Editar
                                                    </a>

                                                    {/* Botón eliminar que abre el modal */}
                                                    <button
                                                        type="button"
                                                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md"
                                                        onClick={() => abrirModal(cv)}
                                                    >
                                                        Eliminar
                                                    </button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan="5" className="celdaCRUD text-center py-6">
                                                No hay curriculums disponibles.
                                            </TableCell>
                                        </TableRow>
                                    )}

                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </main>
                {/* Modal de confirmación */}
                {curriculumSeleccionado && (
                    <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                        <ModalHeader />
                        <ModalBody>
                            <div className="text-center">
                                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400" />
                                <h3 className="mb-5 text-lg font-normal text-gray-500">
                                    ¿Estás seguro de que deseas eliminar el curriculum <strong>{curriculumSeleccionado.nombre}</strong>?
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
