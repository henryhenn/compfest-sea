import MainLayout from "@/Layouts/MainLayout.jsx";
import {Head, Link, usePage} from "@inertiajs/react";
import {LinkButton} from "@/Components/LinkButton.jsx";
import {Alert} from "@/Components/Alert.jsx";
import {MovieCard} from "@/Components/MovieCard.jsx";

export default function Home({movies}) {
    const {session} = usePage().props

    return (
        <MainLayout>
            <Head title="Home"/>

            <div className="min-h-screen flex flex-col items-center justify-center">
                {session.message && <Alert/>}

                <h1 className="text-6xl md:text-7xl text-center bg-clip-text text-transparent border-none bg-gradient-to-r from-gray-100 to-gray-400 font-extrabold">
                    Welcome to <span className="text-red-600">SEA Cinema</span><span
                    className="text-gray-300">!</span>
                </h1>

                <p className="mt-10 text-center md:max-w-xl text-xl">Introducing <span
                    className="font-bold text-red-600">SEA Cinema</span>,
                    a rising star in the movie theater industry known for
                    its affordable ticket prices and wide range of movie genres.</p>

                <div className="flex flex-row gap-4">
                    <LinkButton href="" classname="mt-6 font-medium bg-red-600 border-red-600 hover:bg-red-700">Buy
                        tickets here</LinkButton>
                    <LinkButton href=""
                                classname="mt-6 font-medium hover:bg-gray-100 border-gray-100 hover:text-red-600">See
                        all movies</LinkButton>
                </div>
            </div>

            <div>
                <div className="mt-20">
                    <h2 className="text-4xl mb-20 text-gray-100 tracking-wide font-bold text-center">
                        Latest Movies
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {movies.map((movie) => (
                            <MovieCard movie={movie}/>
                        ))}
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}
