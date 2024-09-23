<?php

namespace App\Http\Resources\Episode;

use App\Http\Resources\Movie\MovieResource;
use Illuminate\Http\Request;

class EpisodeDetailResource extends MovieResource
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
            'episode_image' => $this->episode_image,
            'views' => $this->views,
            'created_at' => $this->created_at,
            'slug' => $this->slug,
            'movie_sources' => ($this->movieSources ?? collect($this->movie_sources))->map(function ($source) {
                return [
                    'server_name' => $source->server_name,
                    'source_link' => $this->replaceDefault($source->source_link),
                    'is_m3u8' => $source->is_m3u8 === 1,
                ];
            }),
            'subtitles' => ($this->movieSubtitles ?? collect($this->movie_subtitles))->map(function ($subtitle) {
                return [
                    'language_label' => $subtitle->language_label,
                    'language' => $subtitle->language,
                    'vtt_link' => $subtitle->vtt_link,
                ];
            }),
            'vocabularies' => json_decode($this->vocabulary?->vocabulary_list, true),
            'movie' => [...$this->customEpisode()],
        ];
    }

    private function replaceDefault($input)
    {
        $prefix = 'default';
        $replacement = env('API_SERVER_IMAGE');
        if (strpos($input, $prefix) === 0) {
            return $replacement.substr($input, strlen($prefix));
        }

        return $input;
    }

    public function customEpisode()
    {
        return [
            ...$this->custom($this->movie),
            'movie_episodes' => ($this->movie->movieEpisodes ?? collect($this->movie->movie_episodes))->map(function ($episode) {
                return [
                    'episode_name' => $episode->episode_name,
                    'episode_image' => $episode->episode_image,
                    'views' => $episode->views,
                    'slug' => $episode->slug,
                ];
            }),
        ];
    }
}
