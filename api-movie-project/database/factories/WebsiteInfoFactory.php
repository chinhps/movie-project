<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\WebsiteInfo>
 */
class WebsiteInfoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "asset_name" => fake()->name(),
            "asset_key" => fake()->unique()->randomElement([
                "logo",
                "email",
                "brand",
                "description"
            ]),
            "asset_data" => fake()->text(5)
        ];
    }
}
