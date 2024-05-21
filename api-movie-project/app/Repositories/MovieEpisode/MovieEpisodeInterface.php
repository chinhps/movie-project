<?php

namespace App\Repositories\MovieEpisode;

use App\Models\Movie;

interface MovieEpisodeInterface
{
    public function moviesLatest(float $limit = 15);
    public function getBySlug($slug, array $filter = []);
    public function getListHistory(array $array, float $limit = 15);
    public function updateOrInsert(float|null $id, array $params, Movie $movie);
}
