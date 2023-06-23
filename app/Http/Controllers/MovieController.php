<?php

namespace App\Http\Controllers;

use App\Http\Resources\MovieResource;
use App\Models\Movie;
use Illuminate\Http\Request;

class MovieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $movies = MovieResource::collection(Movie::query()
            ->orderBy('release_date', 'desc')
            ->select('id', 'title', 'age_rating', 'poster_url')
            ->when(request('search') ?? false, function ($query) {
                return $query->where('title', 'like', '%' . request('search') . '%');
            })
            ->get()
        );

        return inertia('Movie/Movies', compact('movies'));
    }


    /**
     * Display the specified resource.
     */
    public function show(Movie $movie)
    {
        $movie = new MovieResource($movie);

        return inertia('Movie/Detail', compact('movie'));
    }

}
