<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MovieEpisode>
 */
class MovieEpisodeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'episode_name' => fake()->name(),
            'status' => fake()->randomElement(['on', 'off']),
            'slug' => fake()->unique()->slug(5),
            'episode_image' => fake()->imageUrl(400, 200),
            'views' => rand(10000, 999999),
        ];
    }
}
