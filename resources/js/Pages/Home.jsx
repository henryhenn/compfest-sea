import {MainLayout} from "@/Layouts/MainLayout.jsx";
import {Head} from "@inertiajs/react";

export default function Home() {
    return (
        <>
            <Head title="Home"/>

            <MainLayout>
                <h1 className="text-3xl font-bold text-center">Ini halaman home</h1>
            </MainLayout>
        </>
    )
}
