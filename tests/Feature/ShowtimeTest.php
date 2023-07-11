<?php

namespace Tests\Feature;

use App\Models\Movie;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Response;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class ShowtimeTest extends TestCase
{
    use RefreshDatabase;

    public function test_all_user_can_view_today_showing_movies()
    {
        $movie = Movie::factory()->create();

        $response = $this->get(route('showtimes'));

        $response->assertStatus(Response::HTTP_OK);
        $response->assertInertia(fn(Assert $inertia) => $inertia
            ->component('Showtime/Showtime')
            ->has('showtimes')
            ->where('showtime.movie.title', $movie->title)
        );
    }

    public function test_all_user_can_search_today_showing_movies()
    {
        $movie = Movie::factory()->create();

        $response = $this->get(route('showtimes', ['search' => $movie->title]));

        $response->assertStatus(Response::HTTP_OK);
        $response->assertInertia(fn(Assert $inertia) => $inertia
            ->has('showtimes', fn(Assert $inertia) => $inertia
                ->where('showtime.movie.title', $movie->title)
            )
        );
    }
}
