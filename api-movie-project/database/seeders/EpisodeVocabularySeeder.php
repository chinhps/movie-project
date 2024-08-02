<?php

namespace Database\Seeders;

use App\Models\EpisodeVocabulary;
use App\Models\MovieEpisode;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EpisodeVocabularySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $episodes = MovieEpisode::all();

        $episodes->each(function ($episode) {
            EpisodeVocabulary::factory()->create([
                "movie_episode_id" => $episode->id,
            ]);
        });
    }
}
