<?php

namespace App\Http\Controllers;

use App\Http\Resources\MovieResource;
use App\Models\Movie;

class HomeController extends Controller
{
    public function __invoke()
    {
        $movies = MovieResource::collection(
            Movie::query()
                ->orderBy('release_date', 'desc')
                ->select('id', 'title', 'age_rating', 'poster_url')
                ->take(12)
                ->get()
        );

        return inertia('Home', compact('movies'));
    }
}
