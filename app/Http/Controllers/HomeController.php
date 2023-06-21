<?php

namespace App\Http\Controllers;

use App\Http\Resources\MovieResource;
use App\Models\Movie;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
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
