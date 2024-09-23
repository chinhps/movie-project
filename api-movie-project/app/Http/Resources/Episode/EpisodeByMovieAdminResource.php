<?php

namespace App\Http\Resources\Episode;

use App\Http\Resources\BaseResource;
use Illuminate\Http\Request;

class EpisodeByMovieAdminResource extends BaseResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            ...$this->movieEpisodes,
        ];
    }
}
