import MainLayout from "@/Layouts/MainLayout.jsx";
import {Head, Link} from "@inertiajs/react";
import {Heading} from "@/Components/Heading.jsx";
import {formatCurrency} from '@/Components/FormatCurrency.jsx'

export default function Detail({auth, movie, showtimes}) {
    return (
        <MainLayout>
            <Head title="Movie's Detail"/>

            <div className="min-h-screen">
                <Heading title={movie.title}/>

                <Link href={route('movies.index')}
                      className="text-gray-100 text-lg hover:text-red-600 hover-transition">
                    Back to Movies
                </Link>

                <article
                    className="max-w-md md:max-w-full md:w-full flex flex-col md:flex-row mx-auto mt-4 shadow-lg shadow-gray-700 rounded-md">
                    <img src={movie.poster_url} loading="lazy" alt={movie.title}
                         className="w-full md:w-96 rounded-t-md mx-auto md:mx-0 md:rounded-l-md"/>
                    <div className="pt-3 mx-4 mb-4">
                        <div className="flex flex-col md:flex-row justify-between">
                            <h2 className="text-4xl font-bold text-gray-100">
                                {movie.title}
                            </h2>
                            <p className="text-gray-100 mt-1">Release date: <span
                                className="font-semibold">{movie.release_date}</span></p>
                        </div>
                        <div className="mt-6 mb-10">
                            <p className="text-gray-100">{movie.description}</p>
                            <div className="inline-flex mt-12 gap-4">
                                <span
                                    className={`text-gray-100 p-3 border ${movie.age_rating >= 15 ? "border-red-600" : "border-gray-100"} rounded font-semibold`}>{movie.age_rating}</span>
                                <span
                                    className="text-gray-100 p-3 border border-gray-100 rounded font-semibold"><span>{formatCurrency.format(movie.ticket_price)}</span></span>
                            </div>

                            <div className="mt-6">
                                <p className="mb-2">Available Showtimes: </p>
                                <div className="grid grid-cols-2 gap-4">
                                    {movie.showtimes.length > 0 ? movie.showtimes.map(showtime => (
                                        <span
                                            className="text-gray-100 p-3 border border-gray-100 rounded font-semibold">{showtime.play_time}</span>
                                    )) : (
                                        <span
                                            className="text-gray-100 p-3 border border-gray-100 rounded font-semibold">No showtimes available at the moment.</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="pb-3">
                            {auth.user ? (
                                movie.showtimes.length >= 1 ?
                                    <Link
                                        href={route('order-ticket.index', movie)}
                                        className="block py-3 px-4 bg-gray-100 text-red-600 text-center border hover-transition rounded-lg shadow md:inline font-medium hover:bg-gray-300 hover:text-red-700">
                                        Buy Tickets Here
                                    </Link>
                                    : ""
                            ) : (
                                <Link href={route('login')}
                                      className="block py-3 px-4 text-center text-gray-100 bg-transparent hover:bg-red-600 border hover-transition border-red-600 active:bg-red-600 active:shadow-none rounded-lg shadow md:inline">
                                    Login Here to Buy Ticket
                                </Link>
                            )}
                        </div>
                    </div>
                </article>
            </div>
        </MainLayout>

    )
}
