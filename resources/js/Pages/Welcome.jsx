import { Head } from '@inertiajs/react';
import Header from '@/Components/Header';
import Inicio from '@/Components/Inicio';
import SobreMi from '@/Components/SobreMi';
import Conocimientos from '@/Components/Conocimientos';
import Proyectos from '@/Components/Proyectos';
import Contacto from '@/Components/Contacto';
import Footer from '@/Components/Footer';
import '../../css/app.css';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Inicio" />
                <div>
                    <Header user={auth.user} />
                    <main>
                        <Inicio/>
                        <SobreMi/>
                        <Conocimientos/>
                        <Proyectos/>
                        <Contacto/>
                    </main>
                    <Footer/>
                </div>
        </>
    );
}
