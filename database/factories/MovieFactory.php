<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Movie>
 */
class MovieFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => 'Movie 1',
            'description' => 'Movie\'s description',
            'release_date' => "09-07-2023",
            'poster_url' => 'some_poster_url',
            'age_rating' => mt_rand(0,18),
            'ticket_price' => 35000
        ];
    }
}
