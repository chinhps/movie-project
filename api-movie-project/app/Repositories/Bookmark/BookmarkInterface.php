<?php

namespace App\Repositories\Bookmark;

use App\Models\Movie;
use App\Models\User;

interface BookmarkInterface
{
    public function list(array $filter = [], User $user, float $paginate = 15);
    public function toggle(User $user, Movie $movie);
}
