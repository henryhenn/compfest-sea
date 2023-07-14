<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrderTicketRequest;
use App\Http\Resources\MovieResource;
use App\Http\Resources\SeatResource;
use App\Http\Resources\ShowtimeResource;
use App\Models\Balance;
use App\Models\Movie;
use App\Models\Seat;
use App\Models\Showtime;
use App\Services\StoreOrderTicketService;

class OrderTicketController extends Controller
{
    public function index(Movie $movie)
    {
        $movie = new MovieResource($movie);
        $seats = SeatResource::collection(Seat::orderBy('seat_number')->get());
        $showtimes = ShowtimeResource::collection(
            Showtime::query()
                ->with('seats')
                ->where('movie_id', $movie->id)
                ->where('play_time', '>=', now())
                ->get()
        );

        return inertia('Ticket/Order', compact('movie', 'seats', 'showtimes'));
    }

    public function store(OrderTicketRequest $request)
    {
        $userBalance = Balance::where('user_id', auth()->id())->first();

        StoreOrderTicketService::order($request->validated(), $userBalance);

        return to_route('transactions.index')->with('message', 'Your ticket has been successfully ordered!');
    }
}
