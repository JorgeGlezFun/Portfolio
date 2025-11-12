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
