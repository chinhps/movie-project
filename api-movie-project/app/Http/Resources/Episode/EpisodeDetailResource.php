<?php

namespace App\Http\Resources\Episode;

use App\Http\Resources\Movie\MovieResource;
use Illuminate\Http\Request;

class EpisodeDetailResource extends MovieResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "episode_name" => $this->episode_name,
            "created_at" => $this->created_at,
            "slug" => $this->slug,
            "movie_sources" => $this->movieSources->map(function ($source) {
                return [
                    "server_name" => $source->server_name,
                    "source_link" => $source->source_link,
                ];
            }),
            "movie" => [...$this->customEpisode()],
        ];
    }

    public function customEpisode()
    {
        return [
            ...$this->custom($this->movie),
            "movie_episodes" => $this->movie->movieEpisodes->map(function ($episode) {
                return [
                    "episode_name" => $episode->episode_name,
                    "slug" => $episode->slug
                ];
            })
        ];
    }
}
