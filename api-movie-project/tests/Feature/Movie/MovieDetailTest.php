<?php

namespace Tests\Feature\Movie;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class MovieDetailTest extends TestCase
{
    use DatabaseTransactions;

    public function test_movie_detail(): void
    {
        # get some movies
        $response = $this->get('/api/movies');

        $response->assertStatus(200);

        $data = $response->json('data');
        $slugs = array_column(array_slice($data, 0, 4), 'slug');

        foreach ($slugs as $slug) {
            $movieDetail = $this->get("/api/movies/detail/{$slug}");
            $movieDetail->assertStatus(200);
            $movieDetail->assertJsonStructure([
                "data" => [
                    "id",
                    "movie_name",
                    "movie_name_other",
                    "release",
                    "status",
                    "banner_image",
                    "movie_image",
                    "description",
                    "views",
                    "slug",
                    "episodes_counter",
                    "movie_rate_avg_rate",
                    "movie_episode_laster" => [
                        "episode_name",
                        "slug",
                    ],
                    "movie_episodes" => [
                        "*" => [
                            "episode_name",
                            "episode_image",
                            "slug",
                        ],
                    ],
                    "categories" => [
                        "*" => [
                            "name",
                            "slug",
                        ],
                    ],
                    "movie_rate_count",
                ],
            ]);
        }
    }
}
