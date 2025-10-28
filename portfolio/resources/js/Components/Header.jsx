import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Hamburger from '@/Components/Hamburger';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import "../../css/app.css";

export default function Header({ user }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className='flex flex-col'>
            <nav className="contenedorHeader">
                <div className="contenedorMenuNavegacion">
                    <div className="contenedorLogoHeader z-10">
                        <Link href={route('/')} className='flex items-center justify-center'>
                            <ApplicationLogo />
                        </Link>
                    </div>
                    <div className="contenedorEnlacesHeader">
                            <NavLink href="#Inicio">
                                Inicio
                            </NavLink>
                            <NavLink href="#SobreMi">
                                Sobre mí
                            </NavLink>
                            <NavLink href="#Conocimientos">
                                Conocimientos
                            </NavLink>
                            <NavLink href="#Proyectos">
                                Proyectos
                            </NavLink>
                            <NavLink href="#Contacto">
                                Contacto
                            </NavLink>
                            {/* <NavLink href={route('sobremi')} active={route().current('sobremi')}>
                                Nosotros
                            </NavLink>
                            <NavLink href={route('conocimientos.index')} active={route().current('conocimientos.index') || route().current('conocimientos.create') || route().current('conocimientos.edit') || route().current('conocimientos.show')}>
                                Noticias
                            </NavLink>
                            <NavLink href={route('proyectos.index')} active={route().current('proyectos.index') || route().current('proyectos.create') || route().current('proyectos.edit') || route().current('proyectos.show')}>
                                Proyectos
                            </NavLink>
                            <NavLink href={route('contacto')} active={route().current('contacto')}>
                                Contacto
                            </NavLink> */}
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

                    <div className="contenedorBotonMenuMovil">
                        <Hamburger
                            setShowingNavigationDropdown={setShowingNavigationDropdown}
                        />
                    </div>
                </div>

                <div
                    className={`menuNavegacionMovil ${
                        showingNavigationDropdown ? "menuAbierto" : "menuCerrado"
                    }`}
                    >
                    <div className="contenedorMenuNavegacionMovil">
                        <ResponsiveNavLink href="#Inicio">INICIO</ResponsiveNavLink>
                        <ResponsiveNavLink href="#SobreMi">SOBRE MÍ</ResponsiveNavLink>
                        <ResponsiveNavLink href="#Conocimientos">CONOCIMIENTOS</ResponsiveNavLink>
                        <ResponsiveNavLink href="#Proyectos">PROYECTOS</ResponsiveNavLink>
                        <ResponsiveNavLink href="#Contacto">CONTACTO</ResponsiveNavLink>
                        {user && (
                        <div>
                            <ResponsiveNavLink href={route("profile.edit")}>Perfil</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route("logout")} as="button">
                            Cerrar Sesión
                            </ResponsiveNavLink>
                        </div>
                        )}
                        <div className='trampaMovil'/>
                    </div>
                </div>

            </nav>
        </div>
    );
}
