import MainLayout from "@/Layouts/MainLayout.jsx";
import {Head, router} from "@inertiajs/react";
import {MovieCard} from "@/Components/MovieCard.jsx";
import {useState} from "react";
import {Heading} from "@/Components/Heading.jsx";

export default function Movies({movies}) {
    const [search, setSearch] = useState("")

    const searchMovies = () => {
        router.get(
            route('movies.index'),
            {search},
            {
                preserveState: true,
                replace: true
            }
        )
    }

    return (
        <MainLayout>
            <Head title="All Movies"/>

            <div className="min-h-screen">
                <Heading title="All Movies" />

                <div className="flex justify-end">
                    <form
                        onSubmit={(e) => e.preventDefault()}
                        className="w-full md:w-[40%] mb-4">
                        <div className="relative">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                            </svg>
                            <input
                                type="text"
                                placeholder="Search"
                                onKeyUp={searchMovies}
                                onChange={e => setSearch(e.target.value)}
                                className="w-full py-3 pl-12 pr-4 border-gray-700 bg-neutral-800 text-gray-100 focus:border-red-600 focus:ring-red-500 rounded-md shadow-sm"
                            />
                        </div>
                    </form>
                </div>

                {movies.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {movies.map((movie) => (
                            <MovieCard movie={movie}/>
                        ))}
                    </div>
                ) : (
                    <h1 className="text-3xl mt-10 md:text-4xl pb-4 text-center bg-clip-text text-transparent border-none bg-gradient-to-r from-gray-100 to-gray-400 font-bold">
                        Movie not found. Please try again!
                    </h1>
                )}
            </div>
        </MainLayout>
    )

}
