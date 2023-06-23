import MainLayout from "@/Layouts/MainLayout.jsx";
import {Head, Link} from "@inertiajs/react";
import {MovieCard} from "@/Components/MovieCard.jsx";
import {Heading} from "@/Components/Heading.jsx";

export default function Detail({movie}) {
    const formatCurrency = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    })


    return (
        <MainLayout>
            <Head title="Movie's Detail"/>

            <div className="min-h-screen">
                <Heading title={movie.title} />

                <Link href={route('movies.index')}
                      className="text-gray-100 text-lg hover:text-red-600 hover-transition">
                    Back to Movies
                </Link>

                <article
                    className="w-full flex mx-auto mt-4 shadow-lg shadow-gray-700 rounded-md">
                    <img src={movie.poster_url} loading="lazy" alt={movie.title} className="w-[300px] rounded-l-md"/>
                    <div className="pt-3 ml-4 mr-2 mb-3">
                        <div className="flex justify-between mr-6">
                            <h2 className="text-4xl group-hover:text-red-600 hover-transition font-bold text-gray-100">
                                {movie.title}
                            </h2>
                            <p className="text-gray-100 mt-1">Release date: <span
                                className="font-semibold">{movie.release_date}</span></p>
                        </div>
                        <div className="mt-6">
                            <p className="text-gray-100">Description: <span
                                className="font-semibold">{movie.description}</span></p>
                            <div className="inline-flex mt-12 gap-4">
                                <span
                                    className={`text-gray-100 p-3 border ${movie.age_rating >= 15 ? "border-red-600" : "border-gray-100"} rounded font-semibold`}>{movie.age_rating}</span>
                                <span className="text-gray-100 p-3 border border-gray-100 rounded font-semibold"><span
                                    id="currency">{formatCurrency.format(movie.ticket_price)}</span></span>
                            </div>
                        </div>

                    </div>


                </article>
            </div>
        </MainLayout>
    )

}
