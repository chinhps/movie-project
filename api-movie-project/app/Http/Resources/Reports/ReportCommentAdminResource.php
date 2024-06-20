<?php

namespace App\Http\Resources\Reports;

use App\Http\Resources\BaseResource;
use Illuminate\Http\Request;

class ReportCommentAdminResource extends BaseResource
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
            "description" => json_decode($this->description, true),
            "status" => $this->status,
            "user" => $this->userCustom($this->user),
            "comment" => [
                "id" => $this->reportable->id,
                "message" => $this->reportable->message,
                "status" => $this->reportable->status,
            ]
        ];
    }
}
