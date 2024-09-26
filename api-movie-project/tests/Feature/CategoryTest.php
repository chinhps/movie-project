<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class CategoryTest extends TestCase
{
    use DatabaseTransactions;
    protected array $slugs = [];
    protected $response;

    protected function setUp(): void
    {
        parent::setUp();

        $response = $this->get('/api/categories');

        $this->response = $response;
        # test 4 slug or less
        $data = $response->json('data');
        $this->slugs = array_column(array_slice($data, 0, 4), 'slug');
    }

    public function structureCategory(): array
    {
        return [
            'id',
            'name',
            'slug',
            'description',
        ];
    }

    public function test_category_list(): void
    {
        $this->response->assertStatus(200);
        $this->response->assertJsonStructure([
            'data' => [
                '*' => $this->structureCategory(),
            ],
        ]);
    }

    public function test_category_detail(): void
    {
        foreach ($this->slugs as $slug) {
            $response = $this->get("/api/categories/{$slug}");
            $response->assertStatus(200);

            $response->assertJsonStructure([
                'data' => $this->structureCategory(),
            ]);
        }
    }

    public function test_movie_in_category(): void
    {
        foreach ($this->slugs as $slug) {
            $response = $this->get("/api/movies/category/{$slug}");
            $response->assertStatus(200);

            $response->assertJsonStructure([
                'data' => [
                    '*' => [
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
                        ]
                    ],
                ],
            ]);
        }
    }
}
