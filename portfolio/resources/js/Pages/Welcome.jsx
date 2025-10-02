import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from "react";
import Header from '@/Components/Header';
import Inicio from '@/Components/Inicio';
import SobreMi from '@/Components/SobreMi';
import Conocimientos from '@/Components/Conocimientos';

// import Main from '@/Components/Footer';
// import Footer from '@/Components/Footer';
export default function Welcome({ auth, laravelVersion, phpVersion }) {

    return (
        <>
            <Head title="JorgeGlezDev" />
            <div>
                <Header user={auth.user} />
                <main>
                    <Inicio/>
                    <SobreMi/>
                    <Conocimientos/>

                </main>
                <footer className="">
                    Laravel v{laravelVersion} (PHP v{phpVersion})
                </footer>
            </div>
        </>
    );
}
