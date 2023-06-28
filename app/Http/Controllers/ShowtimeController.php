<?php

namespace App\Http\Controllers;

use App\Http\Resources\ShowtimeResource;
use App\Models\Showtime;
use Carbon\Carbon;

class ShowtimeController extends Controller
{
    public function __invoke()
    {
        $showtimes = ShowtimeResource::collection(
            Showtime::query()
                ->orderBy('play_time')
                ->whereDate('play_time', today())
                ->get()
        );

        return inertia('Showtime/Showtime', compact('showtimes'));
    }
}
