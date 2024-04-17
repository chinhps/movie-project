<?php

namespace App\Repositories\Bookmark;

use App\Models\Movie;
use App\Models\User;

interface BookmarkInterface
{
    public function list(array $filter = [], User $user, float $paginate = 15);
    public function updateOrInsert(float|null $id, array $params, User $user, Movie $movie);
    public function remove(User $user, Movie $movie);
}
