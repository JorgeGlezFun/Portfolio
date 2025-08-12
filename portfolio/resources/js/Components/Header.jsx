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
                    <div className="contenedorEnlacesHeader">
                        {/* <div className="contenedorLogoHeader">
                            <Link href={route('/')}>
                                <ApplicationLogo />
                            </Link>
                        </div> */}
                            <NavLink href={route('/')} active={route().current('/')}>
                                Inicio
                            </NavLink>
                            <NavLink href={route('/')}>
                                Sobre mi
                            </NavLink>
                            <NavLink href={route('/')}>
                                Conocimientos
                            </NavLink>
                            <NavLink href={route('/')}>
                                Proyectos
                            </NavLink>
                            <NavLink href={route('/')}>
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
                        {/* <button
                            onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                            className="botonMenuMovil"
                        >
                            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path
                                    className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                                <path
                                    className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button> */}
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block w-full transition ' : 'hidden') + ' xl:hidden'}>
                    <div className="contenedorMenuNavegacionMovil">
                        <ResponsiveNavLink href={route('/')} active={route().current('/')}>
                            Inicio
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('/')}>
                            Sobre mi
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('/')}>
                            Conocimientos
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('/')}>
                            Proyectos
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('/')}>
                            Contacto
                        </ResponsiveNavLink>
                        {/* <ResponsiveNavLink href={route('sobremi')} active={route().current('sobremi')}>
                            Sobre Mi
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('conocimientos.index')} active={route().current('conocimientos.index') || route().current('conocimientos.create') || route().current('conocimientos.edit') || route().current('conocimientos.show')}>
                            Conocimientos
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('proyectos.index')} active={route().current('proyectos.index') || route().current('proyectos.create') || route().current('proyectos.edit') || route().current('proyectos.show')}>
                            Proyectos
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('contacto.index')} active={route().current('contacto.index') || route().current('contacto.create') || route().current('contacto.edit') || route().current('contacto.show')}>
                            Contacto
                        </ResponsiveNavLink> */}
                        {user && (
                            <div>
                                <ResponsiveNavLink href={route('profile.edit')}>
                                    Perfil
                                </ResponsiveNavLink>
                                <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                    Cerrar Sesión
                                </ResponsiveNavLink>
                            </div>

                        )}

                    </div>
                </div>
            </nav>
        </div>
    );
}
