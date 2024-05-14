<?php

namespace App\Http\Resources\Movie;

use App\Http\Resources\BaseResource;
use Illuminate\Http\Request;

class MovieAdminResource extends BaseResource
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
            "comments_counter" => count($this->comments),
            "report_counter" => count($this->movieReports),
            "episoded_counter" => count($this->movieEpisodes)
        ];
    }
}
