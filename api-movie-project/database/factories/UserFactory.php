<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'username' => fake()->unique()->userName(),
            'email_verified_at' => now(),
            'password' => Hash::make('chinhdeptrai012'),
            'remember_token' => Str::random(10),
            'status' => fake()->randomElement(['active', 'inactive']),
            'level' => rand(1, 500),
            'login_type' => 'account',
            'provider_id' => fake()->unique()->numberBetween(1000000000, 9999999999),
            'block' => rand(0, 1),
            'avatar_url' => fake()->imageUrl(200, 200),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     *
     * @return $this
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
