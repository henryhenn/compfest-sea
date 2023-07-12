import MainLayout from "@/Layouts/MainLayout.jsx";
import {Head} from "@inertiajs/react";
import {formatCurrency} from "@/Components/FormatCurrency.jsx";

export default function Ticket({tickets}) {
    return (
        <MainLayout>
            <Head title="Movie Ticket"/>

            <div className="min-h-screen">
                {tickets.map(ticket => (
                    <article
                        className="max-w-md mb-14 mt-6 md:max-w-full md:w-full flex flex-col md:flex-row mx-auto shadow-lg shadow-gray-700 rounded-md">
                        <img src={ticket.movie.poster_url} loading="lazy" alt={ticket.movie.title}
                             className="w-full md:w-64 rounded-t-md mx-auto md:mx-0 md:rounded-l-md"/>
                        <div className="pt-3 mx-4 mb-4">
                            <h2 className="text-3xl font-bold text-gray-100">
                                Ticket ordered by: {ticket.user.name} | {ticket.user.age}
                            </h2>
                            <div className="mt-6 mb-10 space-y-3">
                                <h3 className="text-2xl font-semibold text-gray-100">
                                    Movie: {ticket.movie.title}
                                </h3>
                                <p className="text-gray-100 p-2 border border-gray-100 rounded font-semibold text-lg">Seat: <span
                                    className="font-bold">{ticket.seat.seat_number}</span></p>
                                <p className="text-gray-100 p-2 border border-gray-100 rounded font-semibold text-lg">Total
                                    cost: <span
                                        className="font-bold">{formatCurrency.format(ticket.movie.ticket_price)}</span>
                                </p>
                            </div>
                        </div>
                    </article>
                ))}
            </div>

        </MainLayout>
    )
}
