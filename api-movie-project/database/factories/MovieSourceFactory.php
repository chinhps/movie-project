<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MovieSource>
 */
class MovieSourceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "server_name" => fake()->randomElement(["POW", "TOK", "HYD", "GD"]),
            "source_link" => "https://animehay.blog/pow.php?id=" . rand(61000, 62000),
            "status" => fake()->randomElement(['on', 'off'])
        ];
    }
}
