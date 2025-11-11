import '../../css/crud.css';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import HeaderCRUD from '@/Components/CRUD/HeaderCRUD';
import { Head } from '@inertiajs/react';

export default function Admin(auth) {
    return (
        <>
            <Head title="Admin" />
            <HeaderCRUD user={auth.user} />
            <div>
                <main className='min-h-screen bg-gray-100 pt-[6.8677rem]'>
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 py-12">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                You're logged
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
