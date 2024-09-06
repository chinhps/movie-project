<?php

namespace App\Http\Resources\Movie;

use Illuminate\Http\Request;

class MovieDetailResource extends MovieResource
{

    public function __construct(
        private $data,
    ) {
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [...$this->resource($this->data)];
    }

    public function resource($data): array
    {
        return [
            ...$this->custom($data),
            "movie_episodes" => $data->movieEpisodes?->map(function ($episode) {
                return [
                    "episode_name" => $episode->episode_name,
                    "episode_image" => $episode->episode_image,
                    "slug" => $episode->slug
                ];
            }),
            "categories" => $data->categories?->map(function ($category) {
                return [
                    "name" => $category->name,
                    "slug" => $category->slug
                ];
            }),
            "movie_rate_count" => $data->movie_rate_count
        ];
    }
}
