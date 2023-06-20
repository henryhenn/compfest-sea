import MainLayout from "@/Layouts/MainLayout.jsx";
import {Head, Link} from "@inertiajs/react";
import {LinkButton} from "@/Components/LinkButton.jsx";

export default function Home() {
    return (
        <MainLayout>
            <Head title="Home"/>

            <div className="items-center">

                <div className="mt-16">
                    <h1 className="text-6xl bg-clip-text text-transparent border-none bg-gradient-to-r from-gray-100 to-gray-600 tracking-wide font-extrabold">
                        Welcome to <span className="text-red-600">SEA Cinema</span><span
                        className="text-gray-300">!</span>
                    </h1>

                    <p className="mt-8 md:max-w-xl text-xl">Introducing <span className="font-bold text-red-600">SEA Cinema</span>,
                        a rising star in the movie theater industry known for
                        its affordable ticket prices and wide range of movie genres.</p>

                    <div className="flex flex-col md:flex-row gap-4">
                        <LinkButton href="" classname="mt-6 font-medium bg-red-600 border-red-600 hover:bg-red-700">Buy tickets here</LinkButton>
                        <LinkButton href="" classname="mt-6 font-medium hover:bg-gray-100 border-gray-100 hover:text-red-600">See all movies</LinkButton>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}
