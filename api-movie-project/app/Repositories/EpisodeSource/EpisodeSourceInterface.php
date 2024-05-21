<?php

namespace App\Repositories\EpisodeSource;

use App\Models\MovieEpisode;

interface EpisodeSourceInterface
{
    public function updateOrInsert(float|null $id, array $params, MovieEpisode $episode);
}
