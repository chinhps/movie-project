<?php

namespace App\Http\Resources\Comment;

use App\Http\Resources\BaseResource;
use Illuminate\Http\Request;

class CommentResource extends BaseResource
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
            "message" => $this->message,
            "user" => [
                "name" => $this->user->name,
                "level" => $this->user->level,
            ]
        ];
    }
}
