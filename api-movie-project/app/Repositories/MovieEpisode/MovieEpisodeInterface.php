<?php

namespace App\Repositories\MovieEpisode;

interface MovieEpisodeInterface
{
    public function moviesLatest(float $limit = 15);
    public function getBySlug($slug, array $filter = []);
    public function getListHistory(array $array, float $limit = 15);
}
