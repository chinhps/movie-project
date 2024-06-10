<?php

namespace App\Repositories\Report;

use App\Models\Comment;
use App\Models\Movie;
use App\Models\User;

interface ReportInterface
{
    public function updateOrInsert(
        float|null $id,
        array $params,
        User $user,
        ?Movie $movie = null,
        ?Comment $comment = null
    );
}
