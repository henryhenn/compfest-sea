<?php

namespace App\Http\Controllers;

use App\Http\Resources\MovieResource;
use App\Http\Resources\SeatResource;
use App\Http\Resources\ShowtimeResource;
use App\Models\Balance;
use App\Models\Movie;
use App\Models\Seat;
use App\Models\Showtime;
use App\Models\Ticket;
use App\Models\Transaction;
use App\Services\StoreOrderTicketService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderTicketController extends Controller
{
    public function index(Movie $movie)
    {
        $movie = new MovieResource($movie);
        $seats = SeatResource::collection(
            Seat::orderBy('seat_number')->get()
        );
        $showtimes = ShowtimeResource::collection(
            Showtime::query()
                ->with('seats')
                ->where('movie_id', $movie->id)
                ->where('play_time', '>=', now())
                ->get()
        );

        return inertia('Ticket/Order', compact('movie', 'seats', 'showtimes'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'showtime' => 'required',
            'seat_number' => 'required',
            'movie_id' => 'required',
        ]);

        StoreOrderTicketService::order($request);

        return to_route('transactions.index')->with('message', 'Your ticket has been successfully ordered!');
    }
}
