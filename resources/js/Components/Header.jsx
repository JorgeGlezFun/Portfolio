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
                        <Link href={route('/')} className='linkLogoHeader'>
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
                        className="botonModo"
                        >
                        {/* círculo blanco */}
                        <div
                            className={`bolaBotonModo ${modo ? "translate-x-[-110%]" : "translate-x-[110%]"}`}
                        />

                        {/* contenedor barra */}
                        <div className="contenedorBarraModo">
                            <div
                            className={`carruselModo
                                ${modo ? "-translate-x-1/2" : "translate-x-0"}`}
                            >
                                <div className="barraOscuro" />
                                <div className="barraClaro" />
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
                        <div className='h-10 bg-[#2d343f] dark:bg-[#f5e6cc]'/>
                        <ResponsiveNavLink href="#Inicio">INICIO</ResponsiveNavLink>
                        <ResponsiveNavLink href="#SobreMi">SOBRE MÍ</ResponsiveNavLink>
                        <ResponsiveNavLink href="#Conocimientos">CONOCIMIENTOS</ResponsiveNavLink>
                        <ResponsiveNavLink href="#Proyectos">PROYECTOS</ResponsiveNavLink>
                        <ResponsiveNavLink href="#Contacto">CONTACTO</ResponsiveNavLink>
                        <div className='trampaMovil'/>
                    </div>
                </div>

            </nav>
        </div>
    );
}
