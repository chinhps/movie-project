<?php

namespace App\Http\Resources\Plugin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PluginAdminResource extends JsonResource
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
            "status" => $this->status,
            "form_public" => json_decode($this->form_public, true),
            "created_at" => $this->created_at,
            "plugin_key" => $this->plugin_key,
            "data_public" => json_decode($this->data_public, true),
        ];
    }
}
