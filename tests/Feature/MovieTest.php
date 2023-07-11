<?php

namespace Tests\Feature;

use App\Models\Movie;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Response;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class MovieTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_and_auth_user_can_see_latest_movies()
    {
        $response = $this->get(route('home'));

        $response->assertStatus(Response::HTTP_OK);
        $response->assertInertia(fn(Assert $page) => $page
            ->component('Home')
            ->has('movies')
        );
    }

    public function test_guests_and_auth_user_can_see_all_movies()
    {
        $response = $this->get(route('movies.index'));

        $response->assertStatus(Response::HTTP_OK);
        $response->assertInertia(fn(Assert $page) => $page
            ->component('Movie/Movies')
            ->has('movies')
        );
    }

    public function test_guests_and_auth_user_can_see_movie_detail()
    {
        $movie = Movie::factory()->create();

        $response = $this->get(route('movies.show', $movie));

        $response->assertStatus(Response::HTTP_OK);
        $response->assertInertia(fn(Assert $inertia) => $inertia
            ->component('Movie/Detail')
            ->has('movie.title')
            ->has('movie.description')
            ->has('movie.age_rating')
            ->has('movie.release_date')
            ->has('movie.showtimes')
        );
    }

}
