import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { Head, router } from '@inertiajs/react';
import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useState } from "react";
import HeaderCRUD from '../../Components/CRUD/HeaderCRUD.jsx';

export default function Index({ auth, tipotecnologias }) {

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
                                <h1 className="text-center h-full text-2xl font-bold">Tipos de tecnologías</h1>
                            </div>
                        </div>

                        {/* Tabla */}
                        <div className="overflow-x-auto shadow-sm bg-white rounded-lg">
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableHeadCell>ID</TableHeadCell>
                                        <TableHeadCell>Nombre</TableHeadCell>
                                        <TableHeadCell className="flex flex-col items-center">Acciones</TableHeadCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody className="divide-y">
                                    {tipotecnologias && tipotecnologias.length > 0 ? (
                                        tipotecnologias.map((tec) => (
                                            <TableRow key={tec.id}>
                                                <TableCell className="celdaCRUD">{tec.id}</TableCell>
                                                <TableCell className="celdaCRUD">{tec.nombre}</TableCell>
                                                <TableCell className="celdaCRUD flex h-24 justify-between items-center">
                                                    <a
                                                        href={route('tipotecnologias.show', tec.id)}
                                                        className="botonEditarCRUD font-medium text-primary-600 hover:underline w-full text-center"
                                                    >
                                                        Ver
                                                    </a>
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
            </div>
        </>
    );
}
