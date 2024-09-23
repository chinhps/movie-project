<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\EpisodeVocabulary>
 */
class EpisodeVocabularyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $vocabularySamples = [
            [
                'vocabulary' => 'cat',
                'meaning' => 'con mèo',
                'part_of_speech' => 'noun',
            ],
            [
                'vocabulary' => 'word',
                'meaning' => 'từ ngữ',
                'part_of_speech' => 'noun',
            ],
        ];

        return [
            'vocabulary_list' => json_encode($vocabularySamples),
            'status' => fake()->randomElement(['on', 'off']),
        ];
    }
}
