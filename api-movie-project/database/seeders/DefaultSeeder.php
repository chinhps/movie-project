<?php

namespace Database\Seeders;

use App\Models\Bookmark;
use App\Models\Category;
use App\Models\Comment;
use App\Models\Movie;
use App\Models\MovieEpisode;
use App\Models\MovieHistory;
use App\Models\MovieRate;
use App\Models\MovieReport;
use App\Models\MovieSource;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DefaultSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $movies = Movie::factory(1000)->create();
        $users = User::factory(1000)->create();
        $categories = Category::factory(30)->create();

        $movies->each(function ($movie) use ($categories) {
            $categories->random(rand(4, 10))->each(function ($category) use ($movie) {
                $movie->categories()->attach($category);
            });

            $episodes = [12, 24, 100];
            for ($i = 1; $i <= $episodes[rand(0, 2)]; $i++) {
                $episode = MovieEpisode::factory()->create([
                    "episode_name" => $i,
                    "movie_id" => $movie->id
                ]);
                MovieSource::factory(rand(3, 4))->create([
                    "movie_episode_id" => $episode->id
                ]);
            }
        });

        $movies->random(rand(20, 50))->each(function ($movie) use ($users) {
            $users->random(rand(10, 20))->each(function ($user) use ($movie) {
                MovieReport::factory()->create([
                    "user_id" => $user->id,
                    // "movie_id" => $movie->id
                ]);
            });
        });

        # nofitication
        $users->random(rand(200, 300))->each(function ($user) {
            Notification::factory(5)->create([
                "user_id" => $user->id
            ]);
        });

        $users->each(function ($user) use ($movies) {
            $movies->random(rand(1, 5))->each(function ($movie) use ($user) {
                Comment::factory()->create([
                    "user_id" => $user->id,
                    "movie_id" => $movie->id
                ]);
            });

            $movies->random(rand(20, 30))->each(function ($movie) use ($user) {
                Bookmark::factory()->create([
                    "user_id" => $user->id,
                    "movie_id" => $movie->id
                ]);

                MovieHistory::factory()->create([
                    "user_id" => $user->id,
                    "movie_id" => $movie->id
                ]);
            });

            MovieRate::factory()->create([
                "user_id" => $user->id,
                "movie_id" => $movies->random()->id
            ]);
        });
    }
}
