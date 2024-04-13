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
            "movie_name",
            "movie_name_other",
            "release",
            "status",
            "banner_image",
            "movie_image",
            "description",
            "parent_id" => null
        ];
    }
}
