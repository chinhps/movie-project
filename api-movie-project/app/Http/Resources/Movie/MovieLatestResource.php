<?php

namespace App\Http\Resources\Movie;

use App\Http\Resources\BaseResource;
use Illuminate\Http\Request;

class MovieLatestResource extends MovieResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return $this->custom($this->movie);
    }
}
