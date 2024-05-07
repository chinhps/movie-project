<?php

namespace App\Repositories\Movie;

use App\Models\User;

interface MovieInterface
{
    public function list(array $filter = [], float $limit = 15);
    public function getBySlug(string $slug);
    public function getFullBySlug(string $slug, User $user = null);
}
