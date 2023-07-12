import MainLayout from "@/Layouts/MainLayout.jsx";
import {Head, Link, useForm} from "@inertiajs/react";
import {Heading} from "@/Components/Heading.jsx";
import {formatCurrency} from '@/Components/FormatCurrency.jsx'
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import Modal from "@/Components/Modal.jsx";
import {useState} from "react";
import {data} from "autoprefixer";

export default function Order({auth, movie, seats, showtimes}) {
    const [state, setState] = useState(false)

    const {data, setData, post, errors} = useForm({
        showtime: null,
        seat_numbers: [],
        movie_id: movie.id,
        ticket_price: movie.ticket_price,
    })

    const handleSeatsCheckbox = e => {
        let seat_id = e.target.value

        e.target.checked
            ? setData('seat_numbers', [...data.seat_numbers, seat_id])
            : setData("seat_numbers", data.seat_numbers.filter(seat_number => seat_number !== seat_id))
    }

    const submitOrder = e => {
        e.preventDefault()
        post(route('order-ticket.store'))
        setState(false)
    }

    return (
        <MainLayout>
            <Head title="Order Movie Ticket"/>

            <div className="min-h-screen">
                <Heading title="Order Your Ticket Here"/>

                <article
                    className="max-w-md md:max-w-full md:w-full flex flex-col md:flex-row mx-auto mt-4 shadow-lg shadow-gray-700 rounded-md">
                    <img src={movie.poster_url} loading="lazy" alt={movie.title}
                         className="w-full md:w-96 rounded-t-md mx-auto md:mx-0 md:rounded-l-md"/>
                    <div className="pt-3 ml-4 mr-2 pb-3 flex flex-col md:flex-row gap-6">
                        <div className="flex justify-between">
                            <form className="mx-auto" onSubmit={submitOrder}>
                                <div className="flex flex-col md:flex-row gap-10 md:gap-14">
                                    <div>
                                        <div className="mb-3">
                                            <InputLabel value="Select Movie Showtime" className="mb-1"/>
                                            <select name="showtime"
                                                    autoFocus
                                                    onChange={e => setData("showtime", e.target.value)}
                                                    className="w-full border-gray-700 bg-neutral-900 text-gray-100 focus:border-red-600 focus:ring-red-500 rounded-md shadow-sm"
                                            >
                                                <option disabled value="" selected>-- SELECT SHOWTIME --</option>
                                                {showtimes.map((showtime, key) => (
                                                    <option key={key} value={showtime.id}>
                                                        {showtime.play_time}
                                                    </option>
                                                ))}
                                            </select>
                                            <InputError message={errors.showtime}/>
                                        </div>
                                        <div className="mb-3">
                                            <InputLabel value="Movie" className="mb-1"/>
                                            <TextInput
                                                className="w-full bg-neutral-600"
                                                disabled
                                                type="text"
                                                value={movie.title}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <InputLabel value="Your Name" className="mb-1"/>
                                            <TextInput
                                                className="w-full bg-neutral-600"
                                                disabled
                                                type="text"
                                                value={auth.user.name}
                                                name="name"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <InputLabel value="Your Age" className="mb-1"/>
                                            <TextInput
                                                disabled
                                                className="w-full bg-neutral-600"
                                                type="text"
                                                value={auth.user.age}
                                                name="age"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <InputLabel value="Ticket Price" className="mb-1"/>
                                            <TextInput
                                                disabled
                                                className="w-full bg-neutral-600"
                                                type="text"
                                                value={formatCurrency.format(movie.ticket_price)}
                                                name="ticket_price"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-xl text-center md:text-left font-semibold mb-4">Choose Your
                                            Seat Here</h3>

                                        <p className="text-gray-100 p-3 border border-gray-100 rounded font-semibold text-center mb-10">Screen</p>
                                        {errors.seat_numbers && <InputError message={errors.seat_numbers}/>}
                                        <div className="mb-3 grid grid-cols-12 gap-3">
                                            {seats.map((seat, key) => (
                                                <div className="flex flex-col md:gap-1 mx-auto">
                                                    <input name="seat_numbers[]"
                                                           key={key}
                                                           disabled={data.showtime == null || seat.id === showtimes.map(showtime => showtime.seats.map(seats => console.log(seats.id)))}
                                                           onChange={handleSeatsCheckbox}
                                                           className='w-6 h-6 disabled:bg-gray-400 checked:bg-red-600 hover-transition'
                                                           type="checkbox"
                                                           value={seat.id}/>
                                                    <InputLabel className="text-center" value={seat.seat_number}/>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 gap-6 md:gap-0 flex justify-between">
                                    <Link
                                        className="py-3 px-4 text-center text-white border hover-transition 600 rounded-lg shadow md:inline hover:bg-gray-100 border-gray-100 hover:text-red-600"
                                        href={route('movies.show', movie)}>
                                        Cancel
                                    </Link>

                                    {auth.user.age >= movie.age_rating ? (
                                        auth.user.balance.balance >= movie.ticket_price ? (
                                            <>
                                                <button type="button"
                                                        onClick={e => setState(!state)}
                                                        className="block py-3 px-4 text-center text-gray-100 bg-red-600 border hover-transition border-red-600 hover:bg-red-700 hover:text-gray-200 active:shadow-none rounded-lg shadow md:inline">
                                                    Order Ticket
                                                </button>

                                                {state ? (
                                                    <Modal>
                                                        <div className="grid grid-cols-2">
                                                            <div>
                                                                <p>Name</p>
                                                                <p>Movie Title</p>
                                                                <p>Total Reserved Seats</p>
                                                                <p>Total Ticket Price</p>
                                                            </div>
                                                            <div className="font-semibold">
                                                                <p>{auth.user.name}</p>
                                                                <p>{movie.title}</p>
                                                                <p>{data.seat_numbers.length ?? "Please select your seat first!"}</p>
                                                                <p>{formatCurrency.format(movie.ticket_price * data.seat_numbers.length)}</p>
                                                            </div>
                                                        </div>

                                                        <p>After this transaction, your balance will be deducted by:
                                                            <span
                                                                className="font-semibold">{" "}{formatCurrency.format(movie.ticket_price * data.seat_numbers.length)}</span>
                                                        </p>
                                                    </Modal>
                                                ) : ""
                                                }
                                            </>
                                        ) : (
                                            <p className="md:flex items-center">Sorry, your balance isn't enough to buy
                                                this ticket.
                                                <Link href={route('balance.index')}
                                                      className="text-gray-100 hover-transition hover:text-red-600">
                                                    Topup Here
                                                </Link>
                                            </p>
                                        )
                                    ) : (
                                        <p className="flex items-center">Sorry, your age doesn't met the minimum movie's
                                            age
                                            rating</p>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </article>
            </div>
        </MainLayout>
    )
}
