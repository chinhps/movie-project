<?php

namespace App\Http\Resources\Movie;

use App\Http\Resources\BaseResource;
use Illuminate\Http\Request;

class MovieDetailAdminResource extends BaseResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            ...parent::toArray($request),
            'banner_image' => [$this->banner_image],
            'movie_image' => [$this->movie_image],
            'categories' => $this->categories->pluck('name'),
        ];
    }
}
