<?php

namespace Tests\Feature\Movie;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class MovieHomeTest extends TestCase
{
    use DatabaseTransactions;

    public function test_movie_latest_list(): void
    {
        $response = $this->get('/api/movies/latest');

        $response->assertStatus(200);

        $response->assertJsonStructure([
            "data" => [
                "*" => $this->structureMovie(),
            ],
            "paginate" => [
                "current_page",
                "last_page",
                "total"
            ]
        ]);
    }

    public function test_movie_ranking_list(): void
    {
        $response = $this->get('/api/movies/ranking');

        $response->assertStatus(200);

        $response->assertJsonStructure([
            "data" => [
                "*" => $this->structureMovie(),
            ],
            "paginate" => [
                "current_page",
                "last_page",
                "total"
            ]
        ]);
    }

    public function test_movie_list(): void
    {
        $response = $this->get('/api/movies');

        $response->assertStatus(200);

        $response->assertJsonStructure([
            "data" => [
                "*" => $this->structureMovie(),
            ],
            "paginate" => [
                "current_page",
                "last_page",
                "total"
            ]
        ]);
    }

    public function structureMovie(): array
    {
        return [
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
                "slug"
            ]
        ];
    }
}
