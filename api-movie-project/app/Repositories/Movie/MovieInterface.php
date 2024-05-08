<?php

namespace App\Repositories\Movie;

interface MovieInterface
{
    public function list(array $filter = [], float $limit = 15);
    public function getBySlug(string $slug);
    public function getFullBySlug(string $slug);
    public function getListHistory(array $array, float $limit = 15);
}
