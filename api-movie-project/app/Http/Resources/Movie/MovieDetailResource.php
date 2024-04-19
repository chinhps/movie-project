<?php

namespace App\Http\Resources\Movie;

use App\Http\Resources\BaseResource;
use Illuminate\Http\Request;

class MovieDetailResource extends MovieResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            ...$this->custom($this),
            "movie_episodes" => $this->movieEpisodes->map(function ($episode) {
                return [
                    "episode_name" => $episode->episode_name,
                    "slug" => $episode->slug
                ];
            }),
            "categories" => $this->categories->map(function ($category) {
                return [
                    "name" => $category->name,
                    "slug" => $category->slug
                ];
            }),
            "movie_rate_count" => $this->movie_rate_count
        ];
    }
}
