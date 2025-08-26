import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from "react";
import Header from '@/Components/Header';
// import Prueba from '@/Components/prueba';
import Inicio from '@/Components/Inicio';
// import Main from '@/Components/Footer';
// import Footer from '@/Components/Footer';
export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const fullText =
    `Hola, soy Jorge y te doy la bienvenida a mi portfolio web.
    Aquí encontrarás información sobre mi trayectoria profesional, mis conocimientos y habilidades en desarrollo web,
    así como los proyectos en los que he participado y en los que estoy trabajando actualmente.
    También comparto mis metas a futuro y mi enfoque en crear experiencias digitales funcionales y atractivas.
    Espero que disfrutes explorando mi sitio y que refleje mi pasión por el desarrollo web.`;

    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedText(fullText.slice(0, i));
        i++;
        if (i > fullText.length) clearInterval(interval);
      }, 5); // velocidad (ms por letra)

      return () => clearInterval(interval);
    }, []);


    return (
        <>
            <Head title="JorgeGlezDev" />
            <div>
                <Header user={auth.user} />
                <main>
                    <Inicio displayedText={displayedText}/>
                    {/* <Prueba/> */}

                </main>
                <footer className="">
                    Laravel v{laravelVersion} (PHP v{phpVersion})
                </footer>
            </div>
        </>
    );
}
