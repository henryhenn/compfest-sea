import MainLayout from "@/Layouts/MainLayout.jsx";
import {Head, router} from "@inertiajs/react";
import {useState} from "react";
import {Heading} from "@/Components/Heading.jsx";

export default function Movies({showtimes}) {
    const [search, setSearch] = useState("")

    const searchMovies = () => {
        router.get(
            route('showtimes'),
            {search},
            {
                preserveState: true,
                replace: true
            }
        )
    }

    return (
        <MainLayout>
            <Head title="Today's Shows"/>

            <div className="min-h-screen">
                <Heading title="Today's Shows" />

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

                {showtimes.length > 0 ? (
                    <>
                        <div className="mt-12 relative h-max overflow-auto">
                            <table className="w-full table-auto text-left">
                                <thead className="text-gray-100 font-medium border-b">
                                <tr>
                                    <th className="py-3 pr-6">#</th>
                                    <th className="py-3 pr-6">Movie Title</th>
                                    <th className="py-3 pr-6">Seats Status</th>
                                    <th className="py-3 pr-6">Ticket Price</th>
                                    <th className="py-3 pr-6">Playing on</th>
                                </tr>
                                </thead>
                                <tbody className="text-gray-100 divide-y">
                                {
                                    showtimes.map((showtime, key) => (
                                        <tr key={key}>
                                            <td className="pr-6 py-4 whitespace-nowrap">{key+1}</td>
                                            <td className="pr-6 py-4 whitespace-nowrap">{showtime.movie.title}</td>
                                            <td className="pr-6 py-4 whitespace-nowrap">
                                        {/*<span className={`px-3 py-2 rounded-full font-semibold text-xs ${showtime.status == "Active" ? "text-green-600 bg-green-50" : "text-blue-600 bg-blue-50"}`}>*/}
                                        {/*    {showtime.status}*/}
                                        {/*</span>*/}
                                            </td>
                                            <td className="pr-6 py-4 whitespace-nowrap">{showtime.movie.ticket_price}</td>
                                            <td className="pr-6 py-4 whitespace-nowrap">{showtime.play_time}</td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </table>
                        </div>
                    </>
                ) : (
                    <h1 className="text-3xl mt-10 md:text-4xl pb-4 text-center bg-clip-text text-transparent border-none bg-gradient-to-r from-gray-100 to-gray-400 font-bold">
                        There's no movies showing today. Please try again later!
                    </h1>
                )}
            </div>
        </MainLayout>
    )

}
