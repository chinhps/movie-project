<?php

namespace App\Http\Resources\Movie;

use Illuminate\Http\Request;

class MovieHistoryResource extends MovieResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'episode_name' => $this->episode_name,
            'movie' => $this->custom($this->movie),
        ];
    }
}
