import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Hamburger from '@/Components/Hamburger';
import Dropdown from '@/Components/Dropdown';
import NavLinkCRUD from '@/Components/CRUD/NavLinkCRUD';
import ResponsiveNavLinkCRUD from '@/Components/CRUD/ResponsiveNavLinkCRUD';
import { Link } from '@inertiajs/react';
import "../../../css/crud.css";

export default function Header({ user }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className='flex flex-col'>
            <nav className="contenedorHeaderCRUD">
                <div className="contenedorMenuNavegacionCRUD">
                    <div className="contenedorLogoHeaderCRUD z-10">
                        <Link href={route('/')} className='flex items-center justify-center'>
                            <ApplicationLogo />
                        </Link>
                    </div>
                    <div className="contenedorEnlacesHeaderCRUD">
                        <NavLinkCRUD href={route('admin')} active={route().current('admin')}>
                            Admin
                        </NavLinkCRUD>
                        <NavLinkCRUD href={route('proyectos.index')} active={route().current('proyectos.index')}>
                            Proyectos
                        </NavLinkCRUD>
                        <NavLinkCRUD href={route('tecnologias.index')} active={route().current('tecnologias.index')}>
                            Tecnologías
                        </NavLinkCRUD>
                        <NavLinkCRUD>
                            Tipos de Tecnologías
                        </NavLinkCRUD>
                            {user ?
                            (
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="rounded-md">
                                        <button
                                            type="button"
                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-[#121214] hover:text-[#F6F6F6] hover:bg-[#0088CC] focus:outline-none transition ease-in-out duration-150"
                                        >
                                            <span className="md:inline hidden">{user.name}</span>

                                            <svg
                                                className="md:ms-2  h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>Perfil</Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Cerrar Sesión
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            ) :
                            (
                                <Link href={route('login')} active={route().current('login')} className='usuario'>

                                </Link>

                            )
                            }

                    </div>

                    <div className="contenedorBotonMenuMovilCRUD">
                        <Hamburger
                            setShowingNavigationDropdown={setShowingNavigationDropdown}
                        />
                    </div>
                </div>

                <div
                    className={`menuNavegacionMovilCRUD ${
                        showingNavigationDropdown ? "menuAbierto" : "menuCerrado"
                    }`}
                    >
                    <div className="contenedorMenuNavegacionMovil">
                        <ResponsiveNavLinkCRUD href="#Inicio">Proyectos</ResponsiveNavLinkCRUD>
                        <ResponsiveNavLinkCRUD href="#SobreMi">Tecnologías</ResponsiveNavLinkCRUD>
                        <ResponsiveNavLinkCRUD href="#Conocimientos">Tipos Tecnologías</ResponsiveNavLinkCRUD>
                        {user && (
                        <div>
                            <ResponsiveNavLinkCRUD href={route("profile.edit")}>Perfil</ResponsiveNavLinkCRUD>
                            <ResponsiveNavLinkCRUD method="post" href={route("logout")} as="button">
                            Cerrar Sesión
                            </ResponsiveNavLinkCRUD>
                        </div>
                        )}
                        <div className='trampaMovil'/>
                    </div>
                </div>

            </nav>
        </div>
    );
}
