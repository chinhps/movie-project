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
            'movie_name' => fake()->name(),
            'movie_name_other' => fake()->text(10),
            'release' => 'Q1 '.fake()->randomElement(['2023', '2024', '2022']),
            'status' => fake()->randomElement(['on', 'off']),
            'slug' => fake()->unique()->slug(4),
            'banner_image' => fake()->imageUrl(1200, 700),
            'movie_image' => fake()->imageUrl(400, 500),
            'description' => fake()->text(100),
            'views' => rand(1000, 999999),
            'episodes_counter' => rand(12, 130),
            'parent_id' => null,
        ];
    }
}
