import { Head, Link } from '@inertiajs/react';
import Header from '@/Components/Header';
// import Footer from '@/Components/Footer';
export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="JorgeGlezDev" />
            <div className="">
                <div className="">
                    <div className="">
                        <Header user={auth.user} />

                        <main>

                        </main>

                        <footer className="">
                            Laravel v{laravelVersion} (PHP v{phpVersion})
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
