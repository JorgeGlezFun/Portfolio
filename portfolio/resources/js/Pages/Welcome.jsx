import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from "react";
import Header from '@/Components/Header';
// import Main from '@/Components/Footer';
// import Footer from '@/Components/Footer';
export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const fullText = `Hola, soy Jorge. Tengo 25 años y me dedico al desarrollo web, especializado en Laravel, React y TailwindCSS. Me apasiona crear interfaces limpias y funcionales, con un enfoque en el diseño UI/UX y la experiencia de usuario. También tengo experiencia en desarrollo full-stack, trabajo con Figma e integración de inteligencia artificial. Me considero una persona creativa, con ganas de seguir aprendiendo y que disfruta trabajando en equipo.`;

    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedText(fullText.slice(0, i));
        i++;
        if (i > fullText.length) clearInterval(interval);
      }, 20); // velocidad (ms por letra)

      return () => clearInterval(interval);
    }, []);
    return (
        <>
            <Head title="JorgeGlezDev" />
            <div className="">
                <Header user={auth.user} />
                <main>
                    <div className="min-h-screen items-start m-20">
                        <div className="flex justify-between items-center">
                            <div className="hidden xl:block bg-white rounded-2xl h-[40rem] w-[40rem]">
                            </div>
                            <div className="text-white h-[40rem] w-[55rem]">
                                <h1 className='text-[75px] font-bold h-auto'>Bienvenido <span className="animacionEscritura">_</span></h1>
                                <p className="text-4xl leading-relaxed">
                                    {displayedText}
                                    <span className="inline-block w-px h-5 bg-current animate-[blink_1s_steps(1)_infinite] align-[-2px]" />
                                </p>
                            </div>
                        </div>
                    </div>

                </main>
                <footer className="">
                    Laravel v{laravelVersion} (PHP v{phpVersion})
                </footer>
            </div>
        </>
    );
}
