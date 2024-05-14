<?php

namespace App\Http\Resources\Category;

use App\Http\Resources\BaseResource;
use Illuminate\Http\Request;

class CategoryAdminResource extends BaseResource
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
            "name" => $this->name,
            "slug" => $this->slug,
            "description" => $this->description,
            "movies_count" => $this->movies_count
        ];
    }
}
