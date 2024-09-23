<?php

namespace App\Http\Requests\Episode;

use App\Http\Requests\BaseRequest;

class EpisodeUpsertAdminRequest extends BaseRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'idMovie' => 'required|exists:movies,id',
            'data.*.episode_name' => 'required',
            'data.*.episode_image' => 'required',
            'data.*.status' => 'boolean',
            'data.*.idEpisode' => 'nullable|exists:movie_episodes,id',
            'data.*.servers.*.status' => 'boolean',
            'data.*.servers.*.idSource' => 'nullable|exists:movie_sources,id',
            'data.*.servers.*.server_name' => 'required',
            'data.*.servers.*.server_source' => 'required',
        ];
    }
}
