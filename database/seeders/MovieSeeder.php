<?php

namespace Database\Seeders;

use App\Models\Movie;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class MovieSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $movies = Http::get("https://seleksi-sea-2023.vercel.app/api/movies");

        $movies->collect()->sortBy('title')->map(function ($movie, $item) {
            return Movie::create(collect($movie)->except('id')->toArray());
        });
    }
}
