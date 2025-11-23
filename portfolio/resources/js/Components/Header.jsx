import { useState, useContext } from 'react';
import { ThemeContext } from "@/Components/ThemeContext";
import ApplicationLogo from '@/Components/ApplicationLogo';
import Hamburger from '@/Components/Hamburger';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import "../../css/app.css";

export default function Header({ user }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const { modo, toggleModo } = useContext(ThemeContext);

    return (
        <div className={`flex flex-col ${modo ? "dark" : ""}`}>
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
                    <button
                    onClick={toggleModo}
                    className="flex flex-col items-center justify-center relative w-24 h-full 2xl:ml-4"
                    >
                        <div
                        className={`absolute z-20 top-1/2 left-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full transition duration-500 ease-in-out ${modo ? "translate-x-[-150%]" : "translate-x-[50%]"}`}
                        />
                        <div className="flex flex-shrink-0 flex-none w-24 h-full overflow-hidden">
                            <div className={`flex flex-row w-48 h-6 rounded-xl bg-black overflow-hidden transition duration-500 ease-in-out ${modo ? "translate-x-[-50%]" : "translate-x-0"}`}>
                                <div className="w-1/2 h-full bg-[#66baf4]" />
                                <div className="w-1/2 h-full bg-[#9a1a23]" />
                            </div>
                        </div>
                    </button>
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
