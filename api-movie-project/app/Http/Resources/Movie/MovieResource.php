<?php

namespace App\Http\Resources\Movie;

use App\Http\Resources\BaseResource;
use Illuminate\Http\Request;

class MovieResource extends BaseResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return $this->custom($this);
    }

    public function custom($data): array
    {
        return [
            "id" => $data->id,
            "movie_name" => $data->movie_name,
            "movie_name_other" => $data->movie_name_other,
            "release" => $data->release,
            "status" => $data->status,
            "banner_image" => $data->banner_image,
            "movie_image" => $data->movie_image,
            "description" => $data->description,
            "views" => $data->views,
            "slug" => $data->slug,
            "episodes_counter" => $data->episodes_counter,
            "movie_episodes_count" => $data->movie_episodes_count,
            "movie_rate_avg_rate" => round($data->movie_rate_avg_rate, 1),
            "movie_episode_laster" => [
                "episode_name" => $data->movieEpisodeLaster->episode_name,
                "slug" => $data->movieEpisodeLaster->slug
            ]
        ];
    }
}
